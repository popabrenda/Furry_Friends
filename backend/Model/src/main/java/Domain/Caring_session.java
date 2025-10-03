package Domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Caring_session extends Entity{
    Care_need care_need;
    User caretaker;
    LocalDate start_date;
    LocalDate end_date;

    public Caring_session(int id, Care_need care_need, User caretaker, LocalDate start_date, LocalDate end_date) {
        super(id);
        this.care_need = care_need;
        this.caretaker = caretaker;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public Caring_session(Care_need care_need, User caretaker, LocalDate start_date, LocalDate end_date) {
        this.care_need = care_need;
        this.caretaker = caretaker;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public Caring_session() {

    }

    public Care_need getCare_need() {
        return care_need;
    }

    public void setCare_need(Care_need care_need) {
        this.care_need = care_need;
    }

    public User getCaretaker() {
        return caretaker;
    }

    public void setCaretaker(User caretaker) {
        this.caretaker = caretaker;
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

    @Override
    public String toString() {
        return "Caring_session{" +
                "id=" + id +
                ", care_need=" + care_need +
                ", caretaker=" + caretaker +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                '}';
    }
}
