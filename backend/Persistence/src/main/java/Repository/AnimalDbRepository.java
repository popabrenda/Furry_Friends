package Repository;

import Domain.*;
import Interfaces.IAnimalRepository;
import Utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class AnimalDbRepository implements IAnimalRepository {

    private final JdbcUtils jdbcUtils;

    // Constructor to initialize JdbcUtils
    @Autowired
    public AnimalDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Animal animal) {
        // Verificăm dacă tipul de animal există în baza de date
        int typeId = getTypeId(animal.getType().getSpecies(), animal.getType().getBreed(),
                animal.getType().getSize_category(), animal.getType().getDaily_care_requirement());

        // Dacă tipul nu există, îl adăugăm
        if (typeId == -1) {
            try {
                typeId = addAnimalType(animal.getType().getSpecies(), animal.getType().getBreed(),
                        animal.getType().getSize_category(), animal.getType().getDaily_care_requirement());
            } catch (SQLException e) {
                System.out.println("Error adding new animal type: " + e.getMessage());
            }
        }

        // Apoi adăugăm animalul în baza de date
        String sql = "INSERT INTO Animals (id_owner, name, id_type, description) VALUES (?, ?, ?, ?)";

        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, animal.getOwner().getId());  // ID-ul proprietarului
            stmt.setString(2, animal.getName());        // Numele animalului
            stmt.setInt(3, typeId);                     // ID-ul tipului de animal (dog, cat, etc.)
            stmt.setString(4, animal.getDescription()); // Descrierea animalului

            stmt.executeUpdate();

            // Recuperăm ID-ul generat pentru animal
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    animal.setId(generatedKeys.getInt(1));  // Setăm ID-ul generat pentru animal
                } else {
                    throw new SQLException("Error: No ID obtained for animal.");
                }
            }
        } catch (SQLException e) {
            System.out.println("Error adding animal: " + e.getMessage());
        }
    }

    // Metodă pentru a verifica dacă tipul de animal există în baza de date
    private int getTypeId(String species, String breed, SizeCategory sizeCategory, DailyCareRequirement dailyCareRequirement) {
        String sql = "SELECT id_type FROM Animal_types WHERE species = ? AND breed = ? AND size_category = ? AND daily_care_requirement = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {

            stmt.setString(1, species);
            stmt.setString(2, breed);
            stmt.setString(3, sizeCategory.name());  // Folosim name() pentru a obține valoarea ca string
            stmt.setString(4, dailyCareRequirement.name());  // Folosim name() pentru a obține valoarea ca string
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt("id_type");  // Returnăm ID-ul tipului de animal
            }
        } catch (SQLException e) {
            System.out.println("Error checking animal type: " + e.getMessage());
        }
        return -1; // Returnăm -1 dacă tipul nu există
    }

    // Modificare metodă pentru adăugarea unui tip de animal
    private int addAnimalType(String species, String breed, SizeCategory sizeCategory, DailyCareRequirement dailyCareRequirement) throws SQLException {
        String sql = "INSERT INTO Animal_types (species, breed, size_category, daily_care_requirement) VALUES (?, ?, ?, ?)";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, species);
            stmt.setString(2, breed);
            stmt.setString(3, sizeCategory.name());  // Folosim name() pentru a obține valoarea ca string
            stmt.setString(4, dailyCareRequirement.name());  // Folosim name() pentru a obține valoarea ca string
            stmt.executeUpdate();

            // Recuperăm ID-ul generat pentru tipul de animal
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return generatedKeys.getInt(1);  // Returnăm ID-ul generat pentru tipul de animal
                } else {
                    throw new SQLException("Error: No ID obtained for animal type.");
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Error adding animal type: " + e.getMessage(), e);
        }
    }

    @Override
    public void update(Integer id, Animal animal) {
        String sql = "UPDATE Animals SET id_owner = ?, name = ?, id_type = ?, description = ? WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, animal.getOwner().getId());
            stmt.setString(2, animal.getName());
            stmt.setInt(3, animal.getType().getId());
            stmt.setString(4, animal.getDescription());
            stmt.setInt(5, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error updating animal: " + e.getMessage());
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Animals WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error deleting animal: " + e.getMessage());
        }
    }

//    @Override
//    public Animal findOne(Integer id) {
//        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
//        try (Connection connection = jdbcUtils.getConnection();
//             PreparedStatement stmt = connection.prepareStatement(sql)) {
//            stmt.setInt(1, id);
//            ResultSet rs = stmt.executeQuery();
//            if (rs.next()) {
//                User owner = findUserById(rs.getInt("id_owner")); // Use the helper method
//                Animal_type type = findAnimalTypeById(rs.getInt("id_type")); // Use the helper method
//
//                return new Animal(
//                        rs.getInt("id_animal"),
//                        rs.getString("name"),
//                        owner,
//                        type,
//                        rs.getString("description")
//                );
//            }
//        } catch (SQLException e) {
//            System.out.println("Error finding animal: " + e.getMessage());
//        }
//        return null;
//    }


    @Override
    public Animal findOne(Integer id) {
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";

        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {

            System.out.println("Connection obtained successfully.");

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Obține utilizatorul (owner) și tipul de animal
                    User owner = findUserById(rs.getInt("id_owner"), connection);
                    Animal_type type = findAnimalTypeById(rs.getInt("id_type"), connection);

                    // Validare rezultate
                    if (owner == null) {
                        System.err.println("Owner not found for animal ID: " + id);
                    }
                    if (type == null) {
                        System.err.println("Animal type not found for animal ID: " + id);
                    }

                    // Crearea obiectului Animal dacă datele sunt valide
                    if (owner != null && type != null) {
                        return new Animal(
                                rs.getInt("id_animal"),
                                rs.getString("name"),
                                owner,
                                type,
                                rs.getString("description")
                        );
                    }
                } else {
                    System.out.println("Animal not found with ID: " + id);
                }
            }
        } catch (SQLException e) {
            // Log detaliat pentru debugging
            System.err.println("Error finding animal with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
        }
        return null; // Returnează null dacă animalul nu este găsit
    }

    public Iterable<Animal> getAll() {
        List<Animal> animals = new ArrayList<>();
        String sql = "SELECT * FROM Animals"; // Selectează toate animalele

        try (Connection connection = jdbcUtils.getConnection(); // Obține conexiunea din JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                // Extrage id-ul owner-ului și al tipului de animal
                int ownerId = rs.getInt("id_owner");
                int typeId = rs.getInt("id_type");

                // Obține owner-ul (User) și tipul animalului (Animal_type)
                User owner = findUserById(ownerId, connection);  // Trebuie să folosești conexiunea pentru a extrage User-ul
                Animal_type type = findAnimalTypeById(typeId, connection);  // Similar pentru Animal_type

                // Creează obiectul Animal
                Animal animal = new Animal(
                        rs.getInt("id_animal"),
                        rs.getString("name"),
                        owner,
                        type,
                        rs.getString("description")
                );

                // Adaugă animalul în lista de animale
                animals.add(animal);
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving all animals: " + e.getMessage());
        }
        return animals;
    }

    // Metoda auxiliară pentru a obține un User după ID
    private User findUserById(int userId, Connection connection) throws SQLException {
        if (connection == null || connection.isClosed()) {
            throw new SQLException("Connection is null or closed.");
        }

        String sql = "SELECT * FROM Users WHERE id_user = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Address address = null;
                    int addressId = rs.getInt("id_address");
                    if (!rs.wasNull()) {
                        address = getAddressById(addressId, connection); // Obține adresa utilizatorului
                    }

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
            }
        }
        return null; // Dacă user-ul nu este găsit
    }


    // Metoda auxiliară pentru a obține un Animal_type după ID
    private Animal_type findAnimalTypeById(int typeId, Connection connection) throws SQLException {
        String sql = "SELECT * FROM Animal_types WHERE id_type = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, typeId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    SizeCategory size_category = SizeCategory.valueOf(rs.getString("size_category"));
                    DailyCareRequirement daily_care_requirement = DailyCareRequirement.valueOf(rs.getString("daily_care_requirement"));
                    return new Animal_type(
                            rs.getInt("id_type"),
                            rs.getString("species"),
                            rs.getString("breed"),
                            size_category,
                            daily_care_requirement
                    );
                }
            }
        }
        return null;
    }

    // Metoda auxiliară pentru a obține adresa unui user după ID
    private Address getAddressById(int addressId, Connection connection) throws SQLException {
        String sql = "SELECT * FROM Addresses WHERE id_address = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, addressId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Address(
                            rs.getInt("id_address"),
                            rs.getString("street"),
                            rs.getString("city"),
                            rs.getString("state")
                    );
                }
            }
        }
        return null; // Dacă nu găsești adresa
    }
    @Override
    public void setAll(Iterable<Animal> entitati) {
        // Method implementation if needed
    }

    // Helper method to find a User by ID
    private User findUserById(int userId) {
        String sql = "SELECT * FROM Users WHERE id_user = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new User(
                        rs.getInt("id_user")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding user: " + e.getMessage());
        }
        return null;
    }

    // Helper method to find an Animal_type by ID
    private Animal_type findAnimalTypeById(int typeId) {
        String sql = "SELECT * FROM Animal_types WHERE id_type = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, typeId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Animal_type(
                        rs.getInt("id_type")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding animal type: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<Animal> getAllAnimalsById(int id)
    {
        List<Animal> animals = new ArrayList<>();
        String sql = "SELECT * FROM Animals WHERE id_owner = ?"; // Selectăm toate animalele pentru un anumit owner

        try (Connection connection = jdbcUtils.getConnection(); // Obținem conexiunea din JdbcUtils
             PreparedStatement stmt = connection.prepareStatement(sql)) {

            stmt.setInt(1, id);  // Setăm id-ul utilizatorului pentru a filtra animalele
            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {
                    // Extragem id-ul owner-ului și al tipului de animal
                    int ownerId = rs.getInt("id_owner");
                    int typeId = rs.getInt("id_type");

                    // Obținem owner-ul (User) și tipul animalului (Animal_type)
                    User owner = findUserById(ownerId, connection);  // Trebuie să folosești conexiunea pentru a extrage User-ul
                    Animal_type type = findAnimalTypeById(typeId, connection);  // Similar pentru Animal_type

                    // Creează obiectul Animal
                    Animal animal = new Animal(
                            rs.getInt("id_animal"),
                            rs.getString("name"),
                            owner,
                            type,
                            rs.getString("description")
                    );

                    // Adăugăm animalul în lista de animale
                    animals.add(animal);
                }
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving animals for owner with ID " + id + ": " + e.getMessage());
        }
        return animals;
    }

}