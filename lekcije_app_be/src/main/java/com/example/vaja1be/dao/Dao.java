package com.example.vaja1be.dao;

import java.util.List;

public interface Dao<T> {
    List<T> getAll();
    T get(long id);
    void save(T t);
    void delete(long id);
}
