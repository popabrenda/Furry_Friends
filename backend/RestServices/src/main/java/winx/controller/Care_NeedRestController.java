package winx.controller;



import Domain.Care_need;
import Interfaces.ICare_needRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/furry_friends/care-need")
@CrossOrigin(origins = "http://localhost:8080")
public class Care_NeedRestController {

    @Autowired
    private ICare_needRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Care_need>> getCare_needsByAnimalId(@PathVariable("id") Integer id) {
        System.out.println("Getting care needs by animal id");
        try {
            Iterable<Care_need> care_needs = repository.getCare_needByAnimalId(id);
            return ResponseEntity.ok(care_needs);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCare_need(@RequestBody Care_need care_need) {
        try {
            repository.add(care_need);
            return ResponseEntity.ok(care_need);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCare_need(@PathVariable("id") Integer id) {
        try {
            repository.remove(id);
            return ResponseEntity.ok().body(new HashMap<String, String>() {{
                put("message", "Care need deleted");
            }});
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateCareNeedStatus(@PathVariable("id") Integer id, @RequestParam("status") String status) {
        try {
            repository.updateStatus(id, status);
            return ResponseEntity.ok().body(new HashMap<String, String>() {{
                put("message", "Care need status updated");
            }});
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/caretaker/{id}")
    public ResponseEntity<?> getCareTakerId(@PathVariable("id") Integer id) {
        try {
            Integer caretakerId = repository.getCareTakerId(id);
            return ResponseEntity.ok().body(caretakerId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}