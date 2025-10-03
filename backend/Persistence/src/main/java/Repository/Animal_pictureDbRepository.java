package Repository;

import Domain.Animal;
import Domain.Animal_picture;
import Domain.Care_need;
import Interfaces.IAnimal_pictureRepository;
import Utils.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class Animal_pictureDbRepository implements IAnimal_pictureRepository {

    private final JdbcUtils jdbcUtils;

    @Autowired
    public Animal_pictureDbRepository(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    @Override
    public void add(Animal_picture animalPicture) {
        String sql = "INSERT INTO Animal_pictures (id_animal, picture) VALUES (?, ?)";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, animalPicture.getAnimal().getId());  // Setează id_animal
            stmt.setBytes(2, animalPicture.getPictureData());
            stmt.executeUpdate();

            ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                animalPicture.setId(generatedKeys.getInt(1)); // Setează ID-ul generat pentru animalPicture
            }
        } catch (SQLException e) {
            System.out.println("Error adding animal picture: " + e.getMessage());
        }
    }

    @Override
    public void update(Integer id, Animal_picture animalPicture) {
        String sql = "UPDATE Animal_pictures SET picture = ? WHERE id_picture = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setBytes(1, animalPicture.getPictureData());
            stmt.setInt(2, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error updating animal picture: " + e.getMessage());
        }
    }

    @Override
    public void remove(Integer id) {
        String sql = "DELETE FROM Animal_pictures WHERE id_picture = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error deleting animal picture: " + e.getMessage());
        }
    }

    @Override
    public Animal_picture findOne(Integer id) {
        String sql = "SELECT * FROM Animal_pictures WHERE id_picture = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int id_animal = rs.getInt("id_animal");
                Animal animal = getAnimalById(id_animal, connection);

                return new Animal_picture(
                        rs.getInt("id_picture"),
                        animal,
                        rs.getBytes("picture")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding animal picture: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Iterable<Animal_picture> getAll() {
        List<Animal_picture> pictures = new ArrayList<>();
        String sql = "SELECT * FROM Animal_pictures";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Animal animal = getAnimalById(rs.getInt("id_animal"), connection);
                Animal_picture picture = new Animal_picture(
                        rs.getInt("id_picture"),
                        animal,
                        rs.getBytes("picture")
                );
                pictures.add(picture);
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving all animal pictures: " + e.getMessage());
        }
        return pictures;
    }

    @Override
    public void setAll(Iterable<Animal_picture> pictures) {
        removeAll();  // Optional: elimină toate înregistrările anterioare pentru a adăuga o nouă colecție
        for (Animal_picture picture : pictures) {
            add(picture);
        }
    }

    private void removeAll() {
        String sql = "DELETE FROM Animal_pictures";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error clearing all animal pictures: " + e.getMessage());
        }
    }

    /**
     * Returnează un animal după ID
     * @param animal_id ID-ul animalului
     * @param connection Conexiunea la baza de date
     * @return Animalul cu ID-ul dat (doar numele)
     * @throws SQLException
     */
    private Animal getAnimalById(int animal_id, Connection connection) throws SQLException {
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, animal_id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Animal(
                        rs.getString("name")
                );
            }
        }
        return null;
    }

    /**
     * Returnează toate imaginile pentru un animal dat
     * @param id_animal ID-ul animalului pentru care se caută imaginile
     * @return O colecție de imagini pentru animalul dat
     */
    @Override
    public Iterable<Animal_picture> getPicturesByAnimalId(int id_animal){
        List<Animal_picture> pictures = new ArrayList<>();
        String sql = "SELECT * FROM Animal_pictures WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id_animal);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Animal_picture picture = new Animal_picture(
                        rs.getBytes("picture")
                );
                pictures.add(picture);
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving animal pictures by animal id: " + e.getMessage());
        }
        return pictures;
    }

    @Override
    public Animal getAnimalById(int id) {
        String sql = "SELECT * FROM Animals WHERE id_animal = ?";
        try (Connection connection = jdbcUtils.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Animal(
                        rs.getInt("id_animal"),
                        rs.getString("name")
                );
            }
        } catch (SQLException e) {
            System.out.println("Error finding animal by ID: " + e.getMessage());
        }
        return null;
    }
}
