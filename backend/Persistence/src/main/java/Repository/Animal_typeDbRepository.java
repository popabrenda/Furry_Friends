package Repository;

import Domain.Animal_type;
import Domain.Care_need;
import Domain.DailyCareRequirement;
import Domain.SizeCategory;
import Interfaces.IRepository;
import Utils.JdbcUtils;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Animal_typeDbRepository implements IRepository<Integer, Animal_type> {
    private final JdbcUtils jdbcUtils; // Fixed semicolon here

    public Animal_typeDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Animal_type entity) {
        String sql = "INSERT INTO Animal_types (species, breed, size_category, daily_care_requirement) VALUES (?, ?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, entity.getSpecies());
            statement.setString(2, entity.getBreed());
            statement.setString(3, entity.getSize_category().toString()); // Assuming SizeCategory is an enum
            statement.setString(4, entity.getDaily_care_requirement().toString()); // Assuming DailyCareRequirement is an enum
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(Integer id, Animal_type entity) {
        String sql = "UPDATE Animal_types SET species = ?, breed = ?, size_category = ?, daily_care_requirement = ? WHERE id_type = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, entity.getSpecies());
            statement.setString(2, entity.getBreed());
            statement.setString(3, entity.getSize_category().toString());
            statement.setString(4, entity.getDaily_care_requirement().toString());
            statement.setInt(5, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Animal_types WHERE id_type = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Animal_type findOne(Integer id) {
        String sql = "SELECT * FROM Animal_types WHERE id_type = ?";
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                String species = resultSet.getString("species");
                String breed = resultSet.getString("breed");
                SizeCategory sizeCategory = SizeCategory.valueOf(resultSet.getString("size_category"));
                DailyCareRequirement careRequirement = DailyCareRequirement.valueOf(resultSet.getString("daily_care_requirement"));
                return new Animal_type(id, species, breed, sizeCategory, careRequirement);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Iterable<Animal_type> getAll() {
        List<Animal_type> animalTypes = new ArrayList<>();
        String sql = "SELECT * FROM Animal_types";
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                int id = resultSet.getInt("id_type");
                String species = resultSet.getString("species");
                String breed = resultSet.getString("breed");
                SizeCategory sizeCategory = SizeCategory.valueOf(resultSet.getString("size_category"));
                DailyCareRequirement careRequirement = DailyCareRequirement.valueOf(resultSet.getString("daily_care_requirement"));
                animalTypes.add(new Animal_type(id, species, breed, sizeCategory, careRequirement));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return animalTypes;
    }

    @Override
    public void setAll(Iterable<Animal_type> entities) {
        // Assuming you have a way to update all entities at once
        // For simplicity, we can delete all existing records and insert the new ones
        try (Connection connection = jdbcUtils.getConnection(); // Use jdbcUtils to get the connection
             Statement statement = connection.createStatement()) {
            // Delete all entries in the table
            statement.executeUpdate("DELETE FROM Animal_types");

            // Insert all entities
            for (Animal_type entity : entities) {
                add(entity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
