package winx.controller;


import Domain.Animal;
import Domain.Care_need;
import Domain.Caring_session;
import Interfaces.ICare_needRepository;
import Interfaces.ICaring_sessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/furry_friends/caring-sessions")
@CrossOrigin(origins = "http://localhost:8080")
public class Caring_sessionRestController {

    @Autowired
    private ICaring_sessionRepository repository;

    @PostMapping("/add")
    ResponseEntity<Caring_session> addCaring_session(@RequestBody Caring_session caringSession) {
        System.out.println("Adding caring session");
        try {
            repository.add(caringSession);
            return ResponseEntity.ok(caringSession);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(caringSession);
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Caring_session>> getAllCaring_sessions() {
        System.out.println("Getting caring sessions");
        try {
            Iterable<Caring_session> caring_sessions = repository.getAll();
            return ResponseEntity.ok(caring_sessions);
        } catch (Exception e) {
            System.err.println("Error retrieving caring sessions: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/get-by-user/{id}")
    public ResponseEntity<Iterable<Caring_session>> getCaring_sessionsByUserId(@PathVariable Integer id) {
        System.out.println("Getting caring sessions by user id");
        try {
            Iterable<Caring_session> caring_sessions = repository.getCaring_sessionsByUserId(id);
            return ResponseEntity.ok(caring_sessions);
        } catch (Exception e) {
            System.err.println("Error retrieving caring sessions by user id: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

}
