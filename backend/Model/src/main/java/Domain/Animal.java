package Domain;

import java.util.List;

public class Animal extends Entity{
    String name;
    User owner;
    Animal_type type;
    String description;

    public Animal() {

    }

    public Animal(int id)
    {
        this.id=id;
    }

    public Animal(int id, String name)
    {
        this.id=id;
        this.name=name;
    }

    public Animal(int id, String name, User owner, Animal_type type, String description) {
        super(id);
        this.name = name;
        this.owner = owner;
        this.type = type;
        this.description = description;

    }

    public Animal(String name, User owner, Animal_type type, String description) {
        this.name = name;
        this.owner = owner;
        this.type = type;
        this.description = description;
    }

    public Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Animal_type getType() {
        return type;
    }

    public void setType(Animal_type type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @Override
    public String toString() {
        return "Animal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", owner=" + owner +
                ", type=" + type +
                ", description='" + description + '\'' +
                '}';
    }
}
