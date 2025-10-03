package Interfaces;

import Domain.User;

public interface IUserRepository extends IRepository<Integer, User>
{
    public User findByEmail(String email);
}
