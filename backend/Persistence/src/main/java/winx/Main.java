package winx;

import Domain.*;
import Repository.*;
import Utils.JdbcUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public class Main {
    public static void main(String[] args) {
        // Calea către fișierul de configurare
        String configFilePath = "backend/Persistence/src/main/java/config.properties";

        // Încarcă proprietățile din fișier
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(configFilePath)) {
            props.load(fis);
        } catch (IOException e) {
            System.err.println("Nu s-a putut încărca fișierul de configurare: " + e.getMessage());
            return;
        }

        // Inițializează JdbcUtils cu proprietățile încărcate
        JdbcUtils jdbcUtils = new JdbcUtils(props);

        // Creează repository-urile necesare
        AddressDbRepository addressDbRepository = new AddressDbRepository(jdbcUtils);
        UserDbRepository userDbRepository = new UserDbRepository(jdbcUtils);

//        // Creează obiectul Address și User
//        Address address = new Address("strada", "oras", "stat");
//        addressDbRepository.add(address);
//
       // User user = new User("exemplu@yahoo.com", "password", "Ro", "Ion", 21, "0321412412", address, "descriere", "url");
//
//
//        // Adaugă utilizatorul
//        userDbRepository.add(user);
//
//        System.out.println("Utilizator adăugat cu succes!");

        //adauga un animal// Creați obiectele repository pentru fiecare tip de entitate
        AnimalDbRepository animalDbRepository = new AnimalDbRepository(jdbcUtils);
        Animal_typeDbRepository animal_typeDbRepository = new Animal_typeDbRepository(jdbcUtils);
        Animal_pictureDbRepository animal_pictureDbRepository = new Animal_pictureDbRepository(jdbcUtils);

        // Creați obiectele necesare pentru a adăuga un animal
//        User owner = userDbRepository.findOne(3);
//        System.out.println(owner);
//        Animal_type type = animal_typeDbRepository.findOne(3);
//        System.out.println(type);
//        Animal animal = new Animal("Teddy", owner, type, "Caine prietenos");
//        animalDbRepository.add(animal);
//
//        List<Animal> animals = (List<Animal>) animalDbRepository.getAll();
//        for (Animal animal : animals) {
//            System.out.println(animal);
//        }

//        List <User> users = (List<User>) userDbRepository.getAll();
//        for (User user : users) {
//            System.out.println(user);
//        }
    }
}
