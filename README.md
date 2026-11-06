# TaskFlow API

TaskFlow, görevleri oluşturmak, listelemek, görüntülemek, güncellemek ve silmek için Node.js ve Express.js ile geliştirilmiş bir REST API projesidir. Görevler şimdilik bellekte tutulur; sunucu yeniden başlatıldığında veriler sıfırlanır.

## Özellikler

- Görevler için CRUD işlemleri
- Görev başlığı, açıklaması, durumu, önceliği ve sorumlu bilgisi
- İstek metodu, endpoint ve zaman damgasını konsola yazan logger middleware'i
- Basit sağlık kontrolü endpoint'i

## Gereksinimler

- Node.js 18 veya üzeri
- npm

## Kurulum ve çalıştırma

```bash
npm install
npm start
```

API varsayılan olarak `http://localhost:3000` adresinde çalışır. İsteğe bağlı olarak `PORT` ortam değişkeniyle port belirleyebilirsiniz.

Geliştirme sırasında otomatik yeniden başlatma için:

```bash
npm run dev
```

Sağlık kontrolü: `GET http://localhost:3000/api/health`

## Endpoint'ler

| Metot | Endpoint | Açıklama |
|---|---|---|
| `POST` | `/tasks` | Yeni görev oluşturur |
| `GET` | `/tasks` | Tüm görevleri listeler |
| `GET` | `/tasks/:id` | Belirtilen görevi getirir |
| `PUT` | `/tasks/:id` | Belirtilen görevi günceller |
| `DELETE` | `/tasks/:id` | Belirtilen görevi siler |

Postman'de tüm isteklerde `http://localhost:3000` temel URL'sini kullanın. Eski `/api/tasks` adresi de geriye dönük uyumluluk için çalışır. JSON gövdeli isteklerde `Body > raw > JSON` seçin.

## Postman örnekleri

### Görev oluşturma

`POST http://localhost:3000/tasks`

İstek:

```json
{
  "title": "API dokümantasyonunu hazırla",
  "description": "TaskFlow endpoint'lerini belgele",
  "status": "in-progress",
  "priority": "high",
  "assignee": "Ayşe"
}
```

Başarılı yanıt (`201 Created`):

```json
{
  "data": {
    "id": "5b2e8a4c-a7d1-4f4c-9a7f-123456789abc",
    "title": "API dokümantasyonunu hazırla",
    "description": "TaskFlow endpoint'lerini belgele",
    "status": "in-progress",
    "priority": "high",
    "assignee": "Ayşe",
    "createdAt": "2026-11-06T16:20:00.000Z",
    "updatedAt": "2026-11-06T16:20:00.000Z"
  }
}
```

`id` ve tarih alanları sunucu tarafından oluşturulur; gerçek değerler her istekte farklıdır.

### Görevleri listeleme

`GET http://localhost:3000/tasks`

Yanıt (`200 OK`):

```json
{
  "data": [
    {
      "id": "5b2e8a4c-a7d1-4f4c-9a7f-123456789abc",
      "title": "API dokümantasyonunu hazırla",
      "description": "TaskFlow endpoint'lerini belgele",
      "status": "in-progress",
      "priority": "high",
      "assignee": "Ayşe",
      "createdAt": "2026-11-06T16:20:00.000Z",
      "updatedAt": "2026-11-06T16:20:00.000Z"
    }
  ]
}
```

### Tek görevi getirme

`GET http://localhost:3000/tasks/5b2e8a4c-a7d1-4f4c-9a7f-123456789abc`

Başarılı yanıt `200 OK` durum koduyla görevi `{ "data": { ... } }` biçiminde döndürür. Bulunmayan bir kimlik için `404 Not Found` döner.

### Görevi güncelleme

`PUT http://localhost:3000/tasks/5b2e8a4c-a7d1-4f4c-9a7f-123456789abc`

İstek:

```json
{
  "title": "Dokümantasyonu tamamla",
  "description": "İnceleme sonrası son düzenlemeler",
  "status": "done",
  "priority": "medium",
  "assignee": "Ayşe"
}
```

Başarılı yanıt `200 OK` durum koduyla güncellenen görevi `{ "data": { ... } }` biçiminde döndürür. `PUT` isteğinde alanların tamamını göndermek gerekir.

### Görevi silme

`DELETE http://localhost:3000/tasks/5b2e8a4c-a7d1-4f4c-9a7f-123456789abc`

Başarılı silme işlemi `204 No Content` döndürür.

## Alan değerleri

- `title`: Zorunlu, boş olmayan metin.
- `description`: Metin; varsayılanı `""`.
- `status`: `todo`, `in-progress` veya `done`; varsayılanı `todo`.
- `priority`: `low`, `medium` veya `high`; varsayılanı `medium`.
- `assignee`: Metin veya `null`; varsayılanı `null`.

Geçersiz istek gövdeleri `400 Bad Request`, bulunmayan görevler `404 Not Found` döndürür.

## Proje yapısı

```text
src/
├── app.js
├── server.js
├── controllers/
│   └── taskController.js
├── middlewares/
│   └── logger.js
├── models/
│   └── taskModel.js
└── routes/
    └── taskRoutes.js
```

## Lisans

Bu proje henüz bir açık kaynak lisansı belirtmemektedir.
