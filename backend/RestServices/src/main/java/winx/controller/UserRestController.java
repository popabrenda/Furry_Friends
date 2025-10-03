package winx.controller;


import Domain.Animal;
import Domain.Animal_picture;
import Domain.User;
import Interfaces.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/furry_friends/users")
@CrossOrigin(origins = "http://localhost:8080")
public class UserRestController {

    @Autowired
    private IUserRepository userRepository;

    @GetMapping
    public Iterable<User> getAllUsers() {
        System.out.println("Getting users");
        try {
            return userRepository.getAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        System.out.println("Creating user");
        try {
            //TODO check if user already exists
            userRepository.add(user);
            //(TODO aici am putea returna userul cu tot cu id si adresa
            // gen user = userRepository.findByEmail(user.getEmail());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        System.out.println("Logging in");
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.badRequest().body("Incorrect password");
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile-picture/{id}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int id) {
        System.out.println("Getting profile picture");
        try {
            User user = userRepository.findOne(id);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user.getProfile_picture());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        System.out.println("Getting user by id");
        try {
            User user = userRepository.findOne(id);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
