package Interfaces;

import Domain.Animal;

import java.sql.SQLException;
import java.util.List;

public interface IAnimalRepository extends IRepository<Integer, Animal>
{
    public List<Animal> getAllAnimalsById(int id);

}
