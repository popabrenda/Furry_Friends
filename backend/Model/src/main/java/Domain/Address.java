package Domain;

public class Address extends Entity{
    String street;
    String city;
    String state;

    public Address(int id, String street, String city, String state) {
        super(id);
        this.street = street;
        this.city = city;
        this.state = state;
    }


    public Address() {

    }

    public Address(int id)
    {
        this.id=id;
    }

    public Address(String street, String city, String state)
    {
        this.street=street;
        this.city=city;
        this.state=state;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
