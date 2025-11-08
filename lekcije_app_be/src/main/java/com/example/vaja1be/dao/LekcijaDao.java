package com.example.vaja1be.dao;

import com.example.vaja1be.vao.Lekcija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LekcijaDao extends JpaRepository<Lekcija, Long> {

    /*
     "SELECT l FROM Lekcija l WHERE LOWER(l.naziv) LIKE LOWER(CONCAT('%', :query, '%')) " +
     "OR LOWER(l.opis) LIKE LOWER(CONCAT('%', :query, '%'))"
    */

    @Query("SELECT l FROM Lekcija l WHERE LOWER(l.naziv) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Lekcija> searchLekcije(@Param("query") String query);
}