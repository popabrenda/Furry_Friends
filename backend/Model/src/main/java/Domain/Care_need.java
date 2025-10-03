package Domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Care_need extends Entity{
    Animal animal;
    LocalDate start_date;
    LocalDate end_date;
    Status status;

    public Care_need(int id, Animal animal, LocalDate start_date, LocalDate end_date, Status status) {
        super(id);
        this.animal = animal;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    }

    public Care_need(Animal animal, LocalDate start_date, LocalDate end_date, Status status) {
        this.animal = animal;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    }

    public Care_need() {

    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Care_need{" +
                "id=" + id +
                ", animal=" + animal +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", status='" + status + '\'' +
                '}';
    }
}
