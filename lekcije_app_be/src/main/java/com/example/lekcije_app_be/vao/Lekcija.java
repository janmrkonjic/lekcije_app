package com.example.lekcije_app_be.vao;

import jakarta.persistence.*;

@Entity
public class Lekcija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String naziv;
    private String opis;
    private String yt_url;

    public Lekcija() {}

    public Lekcija(String naziv, String opis, String yt_url) {
        this.naziv = naziv;
        this.opis = opis;
        this.yt_url = yt_url;
    }

    public Long getId() { return id; }
    public String getNaziv() { return naziv; }
    public String getOpis() { return opis; }
    public String getYt_url() { return yt_url; }

    public void setId(Long id) { this.id = id; }
    public void setNaziv(String naziv) { this.naziv = naziv; }
    public void setOpis(String opis) { this.opis = opis; }
    public void setYt_url(String yt_url) { this.yt_url = yt_url; }
}
