package Repository;

import Domain.*;
import Interfaces.ICare_needRepository;
import Utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class Care_needDbRepository implements ICare_needRepository {
    private JdbcUtils jdbcUtils;

    @Autowired
    public Care_needDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Care_need entity) {
        String sql = "INSERT INTO Care_needs (id_animal, start_date, end_date, status) VALUES (?, ?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, entity.getAnimal().getId());
            statement.setDate(2, Date.valueOf(entity.getStart_date()));
            statement.setDate(3, Date.valueOf(entity.getEnd_date()));
            statement.setString(4, entity.getStatus().toString());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(Integer id, Care_need entity) {
        String sql = "UPDATE Care_needs SET id_animal = ?, start_date = ?, end_date = ?, status = ? WHERE id_care_need = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, entity.getAnimal().getId());
            statement.setDate(2, Date.valueOf(entity.getStart_date()));
            statement.setDate(3, Date.valueOf(entity.getEnd_date()));
            statement.setString(4, entity.getStatus().toString());
            statement.setInt(5, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Care_needs WHERE id_care_need = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Care_need findOne(Integer id) {
        String sql = "SELECT * FROM Care_needs WHERE id_care_need = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                int animalId = resultSet.getInt("id_animal");
                Animal animal = getAnimalById(animalId);
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                Status status = Status.valueOf(resultSet.getString("status"));
                return new Care_need(id, animal, startDate, endDate, status);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Iterable<Care_need> getAll() {
        List<Care_need> careNeeds = new ArrayList<>();
        String sql = "SELECT * FROM Care_needs";
        try (Connection connection = jdbcUtils.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                int id = resultSet.getInt("id_care_need");
                int animalId = resultSet.getInt("id_animal");
                Animal animal = getAnimalById(animalId);
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                Status status = Status.valueOf(resultSet.getString("status"));
                careNeeds.add(new Care_need(id, animal, startDate, endDate, status));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return careNeeds;
    }

    @Override
    public void setAll(Iterable<Care_need> entities) {
        try (Connection connection = jdbcUtils.getConnection();
             Statement statement = connection.createStatement()) {
            // Delete all existing care_needs records
            statement.executeUpdate("DELETE FROM Care_needs");

            // Insert all new care_needs
            String sql = "INSERT INTO Care_needs (id_animal, start_date, end_date, status) VALUES (?, ?, ?, ?)";
            try (PreparedStatement insertStatement = connection.prepareStatement(sql)) {
                for (Care_need entity : entities) {
                    insertStatement.setInt(1, entity.getAnimal().getId());
                    insertStatement.setDate(2, Date.valueOf(entity.getStart_date()));
                    insertStatement.setDate(3, Date.valueOf(entity.getEnd_date()));
                    insertStatement.setString(4, entity.getStatus().toString());
                    insertStatement.addBatch();
                }
                insertStatement.executeBatch();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

     //Helper method to get Animal by ID
    private Animal getAnimalById(int animalId) {
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, animalId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new Animal(animalId); // Assuming Animal constructor
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Animal getAnimalById(Connection connection, int animalId) throws SQLException {
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, animalId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Animal(animalId); // Assuming Animal constructor
                }
            }
        }
        return null;
    }

    @Override
    public Iterable<Care_need> getCare_needByAnimalId(Integer id) {
        List<Care_need> careNeeds = new ArrayList<>();
        String sql = "SELECT * FROM Care_needs WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            // Iterăm prin toate rândurile din ResultSet
            while (resultSet.next()) {
                int careNeedId = resultSet.getInt("id_care_need");
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                Status status = Status.valueOf(resultSet.getString("status"));

                // Obține animalul asociat
                Animal animal = getAnimalById(connection, resultSet.getInt("id_animal"));

                // Creează un obiect Care_need și adaugă-l în listă
                Care_need careNeed = new Care_need(careNeedId, animal, startDate, endDate, status);
                careNeeds.add(careNeed);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return careNeeds;
    }

    @Override
    public void updateStatus(Integer id, String status) {
        String sql = "UPDATE Care_needs SET status = ? WHERE id_care_need = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, status);
            statement.setInt(2, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Integer getCareTakerId(Integer id) {
        String sql = "SELECT id_caretaker FROM Caring_sessions WHERE id_care_need = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("id_caretaker");
            }
        } catch (SQLException e) {
            e.printStackTrace();
    }
        return null;
    }

}