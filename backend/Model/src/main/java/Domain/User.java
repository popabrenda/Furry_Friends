package Domain;

public class User extends Entity{

    String email;
    String password;
    String name;
    String surname;
    Integer age;
    String phone_number;
    Address address;
    String description;
    byte[] profile_picture;

    public User(int id, String email, String password, String name, String surname, Integer age, String phone_number, Address address, String description, byte[] profile_picture) {
        super(id);
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.phone_number = phone_number;
        this.address = address;
        this.description = description;
        this.profile_picture = profile_picture;
    }

    public User(String email, String password, String name, String surname, Integer age, String phone_number, Address address, String description, byte[] profile_picture) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.phone_number = phone_number;
        this.address = address;
        this.description = description;
        this.profile_picture = profile_picture;
    }

    public User() {

    }

    public User(int id)
    {
        this.id=id;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getProfile_picture() {
        return profile_picture;
    }

    public void setProfile_picture(byte[] profile_picture) {
        this.profile_picture = profile_picture;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                ", phone_number='" + phone_number + '\'' +
                ", address=" + address +
                ", description='" + description + '\'' +
                ", profile_picture='" + profile_picture + '\'' +
                '}';
    }
}
