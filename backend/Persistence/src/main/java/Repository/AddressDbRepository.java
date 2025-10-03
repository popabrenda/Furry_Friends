package Repository;

import Domain.Address;
import Domain.Care_need;
import Interfaces.IAddressRepository;
import Utils.JdbcUtils;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AddressDbRepository implements IAddressRepository {

    private final JdbcUtils jdbcUtils;

    public AddressDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Address address) {
        String sql = "INSERT INTO Addresses (street, city, state) VALUES (?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, address.getStreet());
            stmt.setString(2, address.getCity());
            stmt.setString(3, address.getState());
            stmt.executeUpdate();

            // Retrieve generated ID for the address
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                address.setId(generatedKeys.getInt(1));
            }
        } catch (SQLException e) {
            System.out.println("Error adding address: " + e.getMessage());
        }
    }

    @Override
    public void update(Integer id, Address address) {
        String sql = "UPDATE Addresses SET street = ?, city = ?, state = ? WHERE id_address = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, address.getStreet());
            stmt.setString(2, address.getCity());
            stmt.setString(3, address.getState());
            stmt.setInt(4, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error updating address: " + e.getMessage());
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Addresses WHERE id_address = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error deleting address: " + e.getMessage());
        }
    }

    @Override
    public Address findOne(Integer id) {
        String sql = "SELECT * FROM Addresses WHERE id_address = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Address(
                        rs.getInt("id_address"),
                        rs.getString("street"),
                        rs.getString("city"),
                        rs.getString("state")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding address: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Iterable<Address> getAll() {
        List<Address> addresses = new ArrayList<>();
        String sql = "SELECT * FROM Addresses";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Address address = new Address(
                        rs.getInt("id_address"),
                        rs.getString("street"),
                        rs.getString("city"),
                        rs.getString("state")
                );
                addresses.add(address);
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving all addresses: " + e.getMessage());
        }
        return addresses;
    }

    @Override
    public void setAll(Iterable<Address> entitati) {

    }
}