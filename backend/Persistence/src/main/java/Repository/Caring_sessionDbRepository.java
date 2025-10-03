package Repository;

import Domain.*;
import Interfaces.ICaring_sessionRepository;
import Utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Component
public class Caring_sessionDbRepository implements ICaring_sessionRepository {
    private final JdbcUtils jdbcUtils;

    // Constructor to initialize the database jdbcUtils
    @Autowired
    public Caring_sessionDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Caring_session entity) {
        String sql = "INSERT INTO Caring_sessions (id_care_need, id_caretaker, start_date, end_date) VALUES (?, ?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, entity.getCare_need().getId()); // Assuming Care_need has a getId method
            statement.setInt(2, entity.getCaretaker().getId()); // Assuming User has a getId method
            statement.setDate(3, Date.valueOf(entity.getStart_date()));
            statement.setDate(4, Date.valueOf(entity.getEnd_date()));
            statement.executeUpdate();
            String sql2 = "UPDATE Care_needs SET status ='accepted' WHERE id_care_need = ?";
            try (PreparedStatement statement2 = connection.prepareStatement(sql2)) {
                statement2.setInt(1, entity.getCare_need().getId());
                statement2.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(Integer id, Caring_session entity) {
        String sql = "UPDATE Caring_sessions SET id_care_need = ?, id_caretaker = ?, start_date = ?, end_date = ? WHERE id_session = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, entity.getCare_need().getId());
            statement.setInt(2, entity.getCaretaker().getId());
            statement.setDate(3, Date.valueOf(entity.getStart_date()));
            statement.setDate(4, Date.valueOf(entity.getEnd_date()));
            statement.setInt(5, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Caring_sessions WHERE id_session = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Caring_session findOne(Integer id) {
        String sql = "SELECT * FROM Caring_sessions WHERE id_session = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                int careNeedId = resultSet.getInt("id_care_need");
                Care_need careNeed = getCareNeedById(careNeedId, connection); // Pass connection to helper method
                int caretakerId = resultSet.getInt("id_caretaker");
                User caretaker = getUserById(caretakerId, connection); // Pass connection to helper method
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                return new Caring_session(id, careNeed, caretaker, startDate, endDate);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Iterable<Caring_session> getAll() {
        List<Caring_session> caringSessions = new ArrayList<>();
        String sql = "SELECT * FROM Caring_sessions";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                int id = resultSet.getInt("id_session");
                int careNeedId = resultSet.getInt("id_care_need");
                Care_need careNeed = getCareNeedById(careNeedId, connection); // Pass connection to helper method
                int caretakerId = resultSet.getInt("id_caretaker");
                User caretaker = getUserById(caretakerId, connection); // Pass connection to helper method
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                caringSessions.add(new Caring_session(id, careNeed, caretaker, startDate, endDate));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return caringSessions;
    }

    @Override
    public void setAll(Iterable<Caring_session> entities) {
        // Delete all existing records and insert the new ones
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             Statement statement = connection.createStatement()) {
            // Delete all entries from the table
            statement.executeUpdate("DELETE FROM Caring_sessions");

            // Insert the new records
            for (Caring_session entity : entities) {
                add(entity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Helper method to get Care_need by ID with connection passed
    private Care_need getCareNeedById(int careNeedId, Connection connection) {
        // Retrieve the Care_need from the database by its ID
        String sql = "SELECT * FROM Care_needs WHERE id_care_need = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, careNeedId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                int id = resultSet.getInt("id_care_need");
                int animalId = resultSet.getInt("id_animal");
                Animal animal = getAnimalById(animalId, connection); // Pass connection to helper method
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                Status status = Status.valueOf(resultSet.getString("status"));
                System.out.println("Care_need found: " + id + " " + animal + " " + startDate + " " + endDate + " " + status);
                return new Care_need(id, animal, startDate, endDate, status);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Helper method to get User by ID with connection passed
    private User getUserById(int userId, Connection connection) {
        // Retrieve the User from the database by its ID
        String sql = "SELECT * FROM Users WHERE id_user = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new User(userId); // Assuming constructor only requires the ID
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Helper method to get Animal by ID with connection passed
    private Animal getAnimalById(int animalId, Connection connection) {
        // Retrieve the Animal from the database by its ID
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, animalId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return new Animal(animalId); // Assuming constructor only requires the ID
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Iterable<Caring_session> getCaring_sessionsByUserId(int userId) {
        List<Caring_session> caringSessions = new ArrayList<>();
        String sql = "SELECT * FROM Caring_sessions WHERE id_caretaker = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id_session");
                int careNeedId = resultSet.getInt("id_care_need");
                Care_need careNeed = getCareNeedById(careNeedId, connection); // Pass connection to helper method
                int caretakerId = resultSet.getInt("id_caretaker");
                User caretaker = getUserById(caretakerId, connection); // Pass connection to helper method
                LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
                LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
                caringSessions.add(new Caring_session(id, careNeed, caretaker, startDate, endDate));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return caringSessions;
    }
}
