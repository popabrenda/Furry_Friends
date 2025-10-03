package Repository;

import Domain.Address;
import Domain.Care_need;
import Domain.User;
import Interfaces.IUserRepository;
import Utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserDbRepository implements IUserRepository {

    private final JdbcUtils jdbcUtils;
    @Autowired
    public UserDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

//    @Override
//    public void add(User user) {
//        String sql = "INSERT INTO Users (email, password, name, surname, age, phone_number, id_address, description, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
//             PreparedStatement stmt = connection.prepareStatement(sql)) {
//            stmt.setString(1, user.getEmail());
//            stmt.setString(2, user.getPassword());
//            stmt.setString(3, user.getName());
//            stmt.setString(4, user.getSurname());
//            stmt.setInt(5, user.getAge());
//            stmt.setString(6, user.getPhone_number());
//            stmt.setInt(7, user.getAddress().getId()); // Using only the address ID
//            stmt.setString(8, user.getDescription());
//            stmt.setString(9, user.getProfile_picture());
//            stmt.executeUpdate();
//        } catch (SQLException e) {
//            System.out.println("Error adding user: " + e.getMessage());
//        }
//    }

    @Override
    public void add(User user) {
        try (Connection connection = jdbcUtils.getConnection()) {
            int addressId = user.getAddress().getId();
            if (addressId == 0) {
                addressId = addAddress(user.getAddress(), connection);
                user.getAddress().setId(addressId);
            }

            String sql = "INSERT INTO Users (email, password, name, surname, age, phone_number, id_address, description, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());
                stmt.setString(3, user.getName());
                stmt.setString(4, user.getSurname());
                stmt.setInt(5, user.getAge());
                stmt.setString(6, user.getPhone_number());
                stmt.setInt(7, addressId);
                stmt.setString(8, user.getDescription());
                stmt.setBytes(9, user.getProfile_picture());
                stmt.executeUpdate();
            }

        } catch (SQLException e) {
            System.out.println("Error adding user: " + e.getMessage());
        }
    }

    private int addAddress(Address address, Connection connection) throws SQLException {
        String sql = "INSERT INTO Addresses (street, city, state) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, address.getStreet());
            stmt.setString(2, address.getCity());
            stmt.setString(3, address.getState());
            stmt.executeUpdate();

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return generatedKeys.getInt(1);
                } else {
                    throw new SQLException("Error: No ID obtained for address.");
                }
            }
        }
    }

    @Override
    public void update(Integer id, User user) {
        String sql = "UPDATE Users SET email=?, password=?, name=?, surname=?, age=?, phone_number=?, id_address=?, description=?, profile_picture=? WHERE id_user=?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getName());
            stmt.setString(4, user.getSurname());
            stmt.setInt(5, user.getAge());
            stmt.setString(6, user.getPhone_number());
            stmt.setInt(7, user.getAddress().getId()); // Using only the address ID
            stmt.setString(8, user.getDescription());
            stmt.setBytes(9, user.getProfile_picture());
            stmt.setInt(10, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error updating user: " + e.getMessage());
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Users WHERE id_user=?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error deleting user: " + e.getMessage());
        }
    }

    @Override
    public User findOne(Integer id) {
        String sql = "SELECT * FROM Users WHERE id_user=?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int addressId = rs.getInt("id_address");
                Address address = getAddressById(addressId, connection); // Pass connection to helper method
                return new User(
                        rs.getInt("id_user"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("name"),
                        rs.getString("surname"),
                        rs.getInt("age"),
                        rs.getString("phone_number"),
                        address,
                        rs.getString("description"),
                        rs.getBytes("profile_picture")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding user: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Iterable<User> getAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM Users";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                int addressId = rs.getInt("id_address");
                Address address = getAddressById(addressId, connection); // Pass connection to helper method
                User user = new User(
                        rs.getInt("id_user"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("name"),
                        rs.getString("surname"),
                        rs.getInt("age"),
                        rs.getString("phone_number"),
                        address,
                        rs.getString("description"),
                        rs.getBytes("profile_picture")
                );
                users.add(user);
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving all users: " + e.getMessage());
        }
        return users;
    }

    @Override
    public void setAll(Iterable<User> users) {
        String sql = "INSERT INTO Users (email, password, name, surname, age, phone_number, id_address, description, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            for (User user : users) {
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());
                stmt.setString(3, user.getName());
                stmt.setString(4, user.getSurname());
                stmt.setInt(5, user.getAge());
                stmt.setString(6, user.getPhone_number());
                stmt.setInt(7, user.getAddress().getId()); // Using only the address ID
                stmt.setString(8, user.getDescription());
                stmt.setBytes(9, user.getProfile_picture());
                stmt.addBatch();
            }
            stmt.executeBatch();
        } catch (SQLException e) {
            System.out.println("Error setting all users: " + e.getMessage());
        }
    }

    // Helper method to get Address by ID with connection passed
    /**
     * Get an Address by ID
     * @param addressId The ID of the Address
     * @param connection The Connection to the database
     * @return The Address with the specified ID
     */
    private Address getAddressById(int addressId, Connection connection) {
        String sql = "SELECT * FROM Addresses WHERE id_address=?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, addressId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Address(
                        rs.getInt("id_address") // am adaugat aici si datele din adresa
                        , rs.getString("street")
                        , rs.getString("city")
                        , rs.getString("state")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving address: " + e.getMessage());
        }
        return null;
    }

    @Override
    public User findByEmail(String email){
        String sql = "SELECT * FROM Users WHERE email=?";
        try (Connection connection = jdbcUtils.getConnection(); // Get connection from JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int addressId = rs.getInt("id_address");
                Address address = getAddressById(addressId, connection); // Pass connection to helper method
                return new User(
                        rs.getInt("id_user"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("name"),
                        rs.getString("surname"),
                        rs.getInt("age"),
                        rs.getString("phone_number"),
                        address,
                        rs.getString("description"),
                        rs.getBytes("profile_picture")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding user by email: " + e.getMessage());
        }
        return null;
    }
}
