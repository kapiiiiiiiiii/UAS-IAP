<?php

defined('BASEPATH') or exit('No direct script access allowed');

use GuzzleHttp\Client;

class Mahasiswa_model extends CI_Model {
    private $client;

    public function __construct() {
        parent::__construct();

        $this->client = new Client([
            'base_uri' => 'http://localhost/rest-api/wpu-rest-server/api/',
            'auth' => ['admin', '1234']
        ]);
    }

    public function getAllMahasiswa()
    {
        $response = $this->client->request('GET', 'mahasiswa', [
            'query' => [
                'wpu-key' => 'ytta'
            ]
        ]);

        $result = json_decode($response->getBody()->getContents(), true);
        return $result['data'];
    }

    public function getMahasiswaById($id)
    {
        $response = $this->client->request('GET', 'mahasiswa', [
            'query' => [
                'wpu-key' => 'ytta',
                'id' => $id
            ]
        ]);

        $result = json_decode($response->getBody()->getContents(), true);
        return $result['data'][0];
    }

    public function tambahDataMahasiswa()
    {
        $data = [
            "nama"    => $this->input->post('nama', true),
            "nrp"     => $this->input->post('nrp', true),
            "email"   => $this->input->post('email', true),
            "jurusan" => $this->input->post('jurusan', true),
            "wpu-key" => 'ytta'
        ];

        $response = $this->client->request('POST', 'mahasiswa', [
            'form_params' => $data
        ]);

        $result = json_decode($response->getBody()->getContents(), true);
        return $result;
    }

    public function hapusDataMahasiswa($id)
    {
        $response = $this->client->request('DELETE', 'mahasiswa', [
            'form_params' => [
                'wpu-key' => 'ytta',
                'id'      => $id
            ]
        ]);

        $result = json_decode($response->getBody()->getContents(), true);
        return $result;
    }

    public function ubahDataMahasiswa()
    {
        $data = [
            "id"      => $this->input->post('id'),
            "nama"    => $this->input->post('nama', true),
            "nrp"     => $this->input->post('nrp', true),
            "email"   => $this->input->post('email', true),
            "jurusan" => $this->input->post('jurusan', true),
            "wpu-key" => 'ytta'
        ];

        $response = $this->client->request('PUT', 'mahasiswa', [
            'form_params' => $data
        ]);

        $result = json_decode($response->getBody()->getContents(), true);
        return $result;
    }

    public function cariDataMahasiswa()
    {
        $keyword = $this->input->post('keyword', true);
        $this->db->like('nama', $keyword);
        $this->db->or_like('jurusan', $keyword);
        $this->db->or_like('nrp', $keyword);
        $this->db->or_like('email', $keyword);
        return $this->db->get('mahasiswa')->result_array();
    }
}
