package Interfaces;


import Domain.Animal;
import Domain.Animal_picture;

public interface IAnimal_pictureRepository extends IRepository<Integer, Animal_picture>
{
    public Iterable<Animal_picture> getPicturesByAnimalId(int id_animal);
    public Animal getAnimalById(int id_animal);
}
