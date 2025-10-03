package Domain;

public class Animal_picture extends Entity{
    Animal animal;
    byte[] pictureData;

    public Animal_picture() {}

    public Animal_picture(byte[] pictureData) {
        this.pictureData = pictureData;
    }

    public Animal_picture(int id, Animal animal, byte[] pictureData) {
        super(id);
        this.animal = animal;
        this.pictureData = pictureData;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public byte[] getPictureData() {
        return pictureData;
    }

    public void setPictureData(byte[] pictureData) {
        this.pictureData = pictureData;
    }

    @Override
    public String toString() {
        return "Animal_picture{" +
                "id=" + id +
                ", animal=" + animal +
                ", pictureData=" + pictureData +
                '}';
    }
}
