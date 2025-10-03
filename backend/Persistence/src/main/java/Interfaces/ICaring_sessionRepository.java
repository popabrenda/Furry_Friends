package Interfaces;

import Domain.Animal;
import Domain.Caring_session;

public interface ICaring_sessionRepository extends IRepository<Integer, Caring_session>
{
    Iterable<Caring_session> getCaring_sessionsByUserId(int userId);
}
