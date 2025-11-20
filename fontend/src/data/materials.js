// File: src/data/materials.js

export const materialsData = [
  {
    id: 1,
    slug: "sapphire-crystal",
    name: "Tinh Thể Sapphire",
    shortDescription:
      "Vật liệu gần như không thể bị trầy xước, đảm bảo sự trong suốt và vẻ đẹp vĩnh cửu.",

    cardImage: "../../src/assets/images/materials/saphira.png", // Ảnh cho thẻ trên trang chủ
    heroImage: "../../src/assets/images/materials/main_saphira.png", // Ảnh hero cho trang chi tiết
    mainImage: "../../src/assets/images/materials/chitiet_saphira.png", // Ảnh chính cho trang chi tiết
    title: "Vẻ Đẹp Vĩnh Cửu",
    subtitle: "Tinh Khiết & Bền Bỉ",
    whatIsTitle: "Sapphire là gì?",
    whatIsDescription:
      "Được tạo ra từ quá trình kết tinh oxit nhôm ở nhiệt độ cực cao, Sapphire nhân tạo có độ cứng chỉ đứng sau kim cương. Điều này mang lại khả năng chống trầy xước gần như tuyệt đối, bảo vệ mặt số đồng hồ khỏi những va đập hàng ngày và giữ cho nó luôn trong suốt như mới sau nhiều năm sử dụng.",
    features: [
      {
        name: "Chống Xước",
        description:
          "Với độ cứng 9 trên thang Mohs, chỉ có kim cương mới có thể làm xước được Sapphire.",
        image: "../../src/assets/images/materials/chongxuoc.png",
      },
      {
        name: "Trong Suốt",
        description:
          "Lớp phủ chống phản chiếu nhiều lớp mang lại khả năng đọc giờ hoàn hảo ở mọi góc nhìn.",
        image: "../../src/assets/images/materials/saphira_trongsuot.png",
      },
      {
        name: "Bền Bỉ",
        description:
          "Chịu được áp lực cực lớn và không bị ảnh hưởng bởi hóa chất hay nhiệt độ.",
        image: "../../src/assets/images/materials/benbi.png",
      },
    ],
  },
  {
    id: 2,
    slug: "titanium-grade-5",
    name: "Titanium Cấp 5",
    shortDescription:
      "Siêu nhẹ, siêu bền và chống ăn mòn. Vật liệu đỉnh cao từ ngành hàng không vũ trụ.",
    cardImage: "../../src/assets/images/materials/titanium/titanium.png",
    heroImage: "../../src/assets/images/materials/titanium.png",
    mainImage: "../../src/assets/images/materials/titanium/chitiet.png",
    title: "Nhẹ Như Lông Hồng",
    subtitle: "Mạnh Mẽ & Tương Lai",
    whatIsTitle: "Titanium Cấp 5 là gì?",
    whatIsDescription:
      "Là một hợp kim chứa 6% nhôm và 4% vanadi, Titanium Cấp 5 (Ti-6Al-4V) có tỷ lệ độ bền trên trọng lượng cao nhất trong các kim loại. Nó nhẹ hơn 40% so với thép nhưng lại cứng hơn đáng kể, đồng thời có khả năng chống ăn mòn tuyệt đối với nước biển và mồ hôi, lý tưởng cho những chiếc đồng hồ thể thao hiệu suất cao.",
    features: [
      {
        name: "Siêu Nhẹ",
        description:
          "Mang lại cảm giác thoải mái tối đa trên cổ tay, gần như không cảm nhận được trọng lượng.",
        image: "../../src/assets/images/materials/titanium/sieunhe.png",
      },
      {
        name: "Chống Dị Ứng",
        description:
          "Titanium hoàn toàn tương thích sinh học, an toàn tuyệt đối cho những làn da nhạy cảm nhất.",
        image: "../../src/assets/images/materials/titanium/chongdiung.png",
      },
      {
        name: "Độ Bền Cao",
        description:
          "Chịu được những va đập mạnh mà không bị biến dạng, là lựa chọn hàng đầu cho các hoạt động khắc nghiệt.",
        image: "../../src/assets/images/materials/titanium/dobencao.png",
      },
    ],
  },
  {
    id: 3,
    slug: "epsom-leather",
    name: "Thép Không Gỉ 904L",
    shortDescription:
      "Thép Austenit siêu hợp kim cao cấp, nổi bật với khả năng chống ăn mòn vượt trội.",
    cardImage: "../../src/assets/images/materials/thepkgi/nen.png",
    heroImage: "../../src/assets/images/materials/thepkgi/abc.png",
    mainImage: "../../src/assets/images/materials/thepkgi/nen.png",
    title: "Dấu Ấn Thanh Lịch",
    subtitle: "Thủ Công & Tinh Tế",
    whatIsTitle: "Da Epsom là gì?",
    whatIsDescription:
      "Không giống các loại thép thông thường, hàm lượng Molipden và Crom trong thép 904L được tăng cường đáng kể để tạo ra một cấu trúc siêu hợp kim. Quá trình này giúp nó trở nên cứng cáp, có khả năng chống ăn mòn vượt trội (đặc biệt trong môi trường axit) và có độ sáng bóng có chiều sâu. Đây là loại thép được các nhà chế tác đồng hồ xa xỉ hàng đầu thế giới tin dùng cho những sản phẩm cao cấp nhất.",
    features: [
      {
        name: "Giữ Phom Dáng",
        description:
          "Cấu trúc cứng cáp giúp bộ dây luôn giữ được hình dáng ban đầu, không bị bai dão qua thời gian.",
        image: "../../src/assets/images/materials/thepkgi/giudang.png",
      },
      {
        name: "Chống Xước Tốt",
        description:
          "Bề mặt dập vân giúp che giấu các vết xước nhỏ, dễ dàng lau chùi và bảo quản.",
        image: "../../src/assets/images/materials/thepkgi/chongxuoc.png",
      },
      {
        name: "Màu Sắc Sống Động",
        description:
          "Thép không gỉ 904L có khả năng được đánh bóng đến độ sáng bóng có chiều sâu vượt trội, lấp lánh.",
        image: "../../src/assets/images/materials/thepkgi/mausatsongdong.png",
      },
    ],
  },
];
