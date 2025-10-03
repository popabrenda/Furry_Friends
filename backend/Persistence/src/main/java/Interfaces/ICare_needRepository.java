package Interfaces;

import Domain.Care_need;

public interface ICare_needRepository extends IRepository<Integer, Care_need>
{
    Iterable<Care_need> getCare_needByAnimalId(Integer id);
    void updateStatus(Integer id, String status);

    Integer getCareTakerId(Integer id);
}
