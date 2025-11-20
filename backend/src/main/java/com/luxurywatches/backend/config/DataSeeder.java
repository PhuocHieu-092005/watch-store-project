package com.luxurywatches.backend.config;

import com.luxurywatches.backend.entity.Category;
import com.luxurywatches.backend.entity.Product;
import com.luxurywatches.backend.entity.Role;
import com.luxurywatches.backend.entity.User;
import com.luxurywatches.backend.repository.CategoryRepository;
import com.luxurywatches.backend.repository.ProductRepository;
import com.luxurywatches.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                if (userRepository.count() == 0) {
                        System.out.println("===== Seeding extensive data... =====");
                        seedUsers();
                        seedCategoriesAndProducts();
                        System.out.println("===== Seeding completed! =====");
                } else {
                        System.out.println("===== Data already exists, skipping seed. =====");
                }
        }

        private void seedUsers() {
                User user = new User();
                user.setUsername("user");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("password"));
                user.setRole(Role.USER);
                userRepository.save(user);

                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("adminpass"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
        }

        private void seedCategoriesAndProducts() {
                // --- Cấp 1: Danh mục gốc ---
                Category menWatches = categoryRepository.save(new Category("Đồng hồ Nam"));
                Category womenWatches = categoryRepository.save(new Category("Đồng hồ Nữ"));

                // --- Cấp 2: Thương hiệu ---
                // Nam
                Category rolexBrand = new Category("Rolex");
                rolexBrand.setParent(menWatches);
                categoryRepository.save(rolexBrand);
                Category patekBrand = new Category("Patek Philippe");
                patekBrand.setParent(menWatches);
                categoryRepository.save(patekBrand);
                Category apBrand = new Category("Audemars Piguet");
                apBrand.setParent(menWatches);
                categoryRepository.save(apBrand);
                Category omegaBrand = new Category("Omega");
                omegaBrand.setParent(menWatches);
                categoryRepository.save(omegaBrand);
                // Nữ
                Category cartierBrand = new Category("Cartier");
                cartierBrand.setParent(womenWatches);
                categoryRepository.save(cartierBrand);
                Category chopardBrand = new Category("Chopard");
                chopardBrand.setParent(womenWatches);
                categoryRepository.save(chopardBrand);
                Category bvlgariBrand = new Category("Bvlgari");
                bvlgariBrand.setParent(womenWatches);
                categoryRepository.save(bvlgariBrand);

                // --- Cấp 3: Bộ sưu tập ---
                // Nam
                Category submariner = new Category("Submariner");
                submariner.setParent(rolexBrand);
                categoryRepository.save(submariner);
                Category daytona = new Category("Daytona");
                daytona.setParent(rolexBrand);
                categoryRepository.save(daytona);
                Category datejust = new Category("Datejust");
                datejust.setParent(rolexBrand);
                categoryRepository.save(datejust);
                Category gmtMaster = new Category("GMT-Master II");
                gmtMaster.setParent(rolexBrand);
                categoryRepository.save(gmtMaster);
                Category skyDweller = new Category("Sky-Dweller");
                skyDweller.setParent(rolexBrand);
                categoryRepository.save(skyDweller);
                Category explorer = new Category("Explorer");
                explorer.setParent(rolexBrand);
                categoryRepository.save(explorer);
                Category nautilus = new Category("Nautilus");
                nautilus.setParent(patekBrand);
                categoryRepository.save(nautilus);
                Category calatrava = new Category("Calatrava");
                calatrava.setParent(patekBrand);
                categoryRepository.save(calatrava);
                Category aquanaut = new Category("Aquanaut");
                aquanaut.setParent(patekBrand);
                categoryRepository.save(aquanaut);
                Category grandComplications = new Category("Grand Complications");
                grandComplications.setParent(patekBrand);
                categoryRepository.save(grandComplications);
                Category worldTime = new Category("World Time");
                worldTime.setParent(patekBrand);
                categoryRepository.save(worldTime);
                Category royalOak = new Category("Royal Oak");
                royalOak.setParent(apBrand);
                categoryRepository.save(royalOak);
                Category royalOakOffshore = new Category("Royal Oak Offshore");
                royalOakOffshore.setParent(apBrand);
                categoryRepository.save(royalOakOffshore);
                Category seamaster = new Category("Seamaster");
                seamaster.setParent(omegaBrand);
                categoryRepository.save(seamaster);
                Category speedmaster = new Category("Speedmaster");
                speedmaster.setParent(omegaBrand);
                categoryRepository.save(speedmaster);
                Category constellation = new Category("Constellation");
                constellation.setParent(omegaBrand);
                categoryRepository.save(constellation);
                Category deVille = new Category("De Ville");
                deVille.setParent(omegaBrand);
                categoryRepository.save(deVille);
                // Nữ
                Category panthere = new Category("Panthère de Cartier");
                panthere.setParent(cartierBrand);
                categoryRepository.save(panthere);
                Category ballonBleu = new Category("Ballon Bleu de Cartier");
                ballonBleu.setParent(cartierBrand);
                categoryRepository.save(ballonBleu);
                Category happySport = new Category("Happy Sport");
                happySport.setParent(chopardBrand);
                categoryRepository.save(happySport);
                Category lHeureDuDiamant = new Category("L'Heure du Diamant");
                lHeureDuDiamant.setParent(chopardBrand);
                categoryRepository.save(lHeureDuDiamant);
                Category serpenti = new Category("Serpenti");
                serpenti.setParent(bvlgariBrand);
                categoryRepository.save(serpenti);
                Category lucea = new Category("Lucea");
                lucea.setParent(bvlgariBrand);
                categoryRepository.save(lucea);

                // --- Gán sản phẩm vào danh mục cấp cuối cùng (Bộ sưu tập) ---
                List<Product> products = Arrays.asList(
                                // Rolex - Submariner
                                new Product("Rolex Submariner Date 126610LN",
                                                "Biểu tượng của thế giới đồng hồ lặn chuyên nghiệp, Submariner Date thế hệ mới khẳng định vị thế với bộ vỏ 41mm bằng thép Oystersteel siêu bền. Vành bezel xoay một chiều bằng gốm Cerachrom đen không chỉ chống xước tuyệt đối mà còn đảm bảo an toàn cho mỗi lần lặn. Trái tim của nó là bộ máy Calibre 3235, một minh chứng cho độ chính xác và khả năng trữ cót vượt trội.",
                                                11550.00, 15, "/images/rolex-submariner-date-126610ln.png", submariner),
                                new Product("Rolex Submariner 'Hulk' 116610LV",
                                                "Một phiên bản huyền thoại được các nhà sưu tầm săn lùng, 'Hulk' nổi bật với mặt số và vành bezel bằng gốm Cerachrom cùng mang một màu xanh lá cây rực rỡ. Đây không chỉ là một chiếc đồng hồ, mà là một tuyên ngôn về phong cách và sự độc đáo, đại diện cho một kỷ nguyên của dòng Submariner.",
                                                23500.00, 7, "/images/rolex-submariner-hulk-116610lv.png", submariner),
                                new Product("Rolex Submariner 'Bluesy' 126613LB",
                                                "Sự kết hợp hoàn hảo giữa hiệu suất và sự sang trọng. 'Bluesy' phô diễn vẻ đẹp lộng lẫy của chất liệu Rolesor vàng-thép, với vành bezel Cerachrom và mặt số sơn mài màu xanh dương hoàng gia. Một lựa chọn đẳng cấp cho những ai muốn nổi bật cả trên cạn lẫn dưới nước.",
                                                15700.00, 10, "/images/rolex-submariner-bluesy-126613lb.png",
                                                submariner),
                                new Product("Rolex Submariner No-Date 124060",
                                                "Trở về với cội nguồn của sự tinh khiết, phiên bản No-Date là sự tôn vinh dành cho mẫu Submariner nguyên bản năm 1953. Thiết kế đối xứng hoàn hảo, mặt số đen tuyền và sự tập trung tuyệt đối vào chức năng cốt lõi đã biến nó thành một biểu tượng của chủ nghĩa tối giản và hiệu suất.",
                                                9100.00, 20, "/images/rolex-submariner-no-date-124060.png", submariner),
                                new Product("Rolex Submariner Date 'Starbucks' 126610LV",
                                                "Kế thừa di sản của 'Kermit', phiên bản 'Starbucks' là sự kết hợp hiện đại giữa vành bezel gốm Cerachrom xanh lá và mặt số đen sâu thẳm. Sự tương phản mạnh mẽ này tạo nên một vẻ ngoài vừa thể thao, vừa tinh tế, nhanh chóng trở thành một trong những mẫu được yêu thích nhất.",
                                                17800.00, 9, "/images/rolex-submariner-starbucks-126610lv.png",
                                                submariner),

                                // Rolex - Daytona
                                new Product("Rolex Cosmograph Daytona 116500LN 'Panda'",
                                                "Huyền thoại bất tử trên đường đua, Cosmograph Daytona 116500LN với mặt số 'Panda' trắng-đen tương phản là một trong những mẫu đồng hồ được khao khát nhất thế giới. Vành bezel Cerachrom với thang đo tachymetric không chỉ là một chi tiết thiết kế mà còn là công cụ đo tốc độ chính xác, gắn liền với di sản đua xe thể thao. Sở hữu Daytona là sở hữu một biểu tượng của tốc độ và thành công.",
                                                32500.00, 8, "/images/rolex-daytona-panda-116500ln.png", daytona),
                                new Product("Rolex Cosmograph Daytona 116500LN Black Dial",
                                                "Phiên bản mặt số đen của Daytona gốm mang đến một vẻ ngoài mạnh mẽ, bí ẩn và đầy nam tính. Sự liền mạch giữa vành bezel và mặt số đen tạo nên một tổng thể hài hòa, tinh tế, là sự lựa chọn hoàn hảo cho những ai yêu thích phong cách thể thao nhưng vẫn giữ được nét sang trọng.",
                                                31000.00, 11, "/images/rolex-daytona-black-dial-116500ln.png", daytona),
                                new Product("Rolex Daytona 'John Mayer' 116508",
                                                "Được mệnh danh theo tên nghệ sĩ John Mayer, phiên bản này là một kiệt tác chế tác từ vàng vàng 18 ct nguyên khối. Điểm nhấn đắt giá là mặt số màu xanh lá cây rực rỡ với hiệu ứng chải tia sunray, tạo ra những sắc thái biến đổi kỳ ảo dưới ánh sáng. Đây là một chiếc đồng hồ dành cho những nhà sưu tầm thực thụ.",
                                                95000.00, 3, "/images/rolex-daytona-john-mayer-116508.png", daytona),
                                new Product("Rolex Daytona Platinum 'Ice Blue' 116506",
                                                "Đỉnh cao của dòng Daytona, phiên bản này được chế tác từ bạch kim 950, kim loại quý hiếm và danh giá nhất. Mặt số màu xanh băng 'ice blue' độc quyền chỉ dành cho các mẫu bạch kim của Rolex, kết hợp với vành bezel Cerachrom màu nâu hạt dẻ, tạo nên một tuyệt tác của sự sang trọng và đẳng cấp tột đỉnh.",
                                                85000.00, 4, "/images/rolex-daytona-platinum-ice-blue-116506.png",
                                                daytona),
                                new Product("Rolex Daytona Everose Gold 116515LN",
                                                "Sự ấm áp của vàng Everose 18 ct độc quyền của Rolex kết hợp hoàn hảo với dây đeo Oysterflex hiệu suất cao. Mặt số màu chocolate hoặc đen tuyền, cùng với vành bezel Cerachrom đen, tạo nên một chiếc đồng hồ thể thao sang trọng, vừa mạnh mẽ vừa tinh tế trên cổ tay.",
                                                38500.00, 6, "/images/rolex-daytona-everose-gold-116515ln.png",
                                                daytona),

                                // Rolex - Datejust
                                new Product("Rolex Datejust 41 'Wimbledon'",
                                                "Là hiện thân của vẻ đẹp thanh lịch cổ điển, Datejust 41 'Wimbledon' quyến rũ mọi ánh nhìn với mặt số màu xám ardoise độc đáo và cọc số La Mã viền xanh lá cây tinh tế. Sự kết hợp hài hòa giữa thép Oystersteel và vàng Everose 18 ct trên dây đeo Jubilee trứ danh tạo nên một tổng thể sang trọng, phù hợp cho mọi dịp, khẳng định phong thái lịch lãm của chủ nhân.",
                                                14800.00, 20, "/images/rolex-datejust-41-wimbledon.png", datejust),
                                new Product("Rolex Datejust 41 Blue Dial",
                                                "Một vẻ đẹp cổ điển nhưng không kém phần hiện đại. Mặt số xanh dương chải tia sunray lôi cuốn, thay đổi sắc thái theo từng góc nhìn. Kết hợp với vành bezel khía bằng vàng trắng và dây đeo Jubilee, đây là chiếc đồng hồ hoàn hảo cho doanh nhân thành đạt.",
                                                9800.00, 25, "/images/rolex-datejust-41-blue-dial.png", datejust),
                                new Product("Rolex Datejust 36 Two-Tone",
                                                "Phiên bản Rolesor vàng-thép với kích thước 36mm là một biểu tượng vượt thời gian, phù hợp với cả nam và nữ. Mặt số màu champagne cổ điển cùng dây đeo Jubilee tạo nên một vẻ ngoài không thể nhầm lẫn, là di sản của sự thanh lịch mà Rolex đã định hình trong nhiều thập kỷ.",
                                                12500.00, 18, "/images/rolex-datejust-36-two-tone.png", datejust),
                                new Product("Rolex Datejust 41 Mint Green",
                                                "Mang hơi thở tươi mới và hiện đại, mặt số màu xanh bạc hà 'mint green' là một trong những màu sắc được yêu thích nhất gần đây. Vẻ đẹp nhẹ nhàng nhưng đầy cuốn hút của nó khi kết hợp với bộ vỏ Oystersteel mạnh mẽ tạo nên một chiếc đồng hồ vừa độc đáo vừa dễ phối đồ.",
                                                10200.00, 22, "/images/rolex-datejust-41-mint-green.png", datejust),
                                new Product("Rolex Datejust 36 Palm Motif",
                                                "Một tác phẩm nghệ thuật trên cổ tay, mặt số được khắc laser tinh xảo với họa tiết lá cọ, gợi nhớ về những khu rừng nhiệt đới sống động. Đây là sự lựa chọn cho những cá tính độc đáo, yêu thích sự khác biệt và trân trọng nghệ thuật chế tác tinh xảo.",
                                                11800.00, 14, "/images/rolex-datejust-36-palm-motif.png", datejust),

                                // Rolex - GMT-Master II
                                new Product("Rolex GMT-Master II 'Pepsi' 126710BLRO",
                                                "Biểu tượng của ngành hàng không, 'Pepsi' với vành bezel gốm Cerachrom hai màu xanh-đỏ đặc trưng cho phép các phi công theo dõi múi giờ thứ hai. Được trang bị dây đeo Jubilee thanh lịch, đây là chiếc đồng hồ của những chuyến du hành và khám phá thế giới.",
                                                16800.00, 12, "/images/rolex-gmt-master-ii-pepsi-126710blro.png",
                                                gmtMaster),
                                new Product("Rolex GMT-Master II 'Batman' 126710BLNR",
                                                "Với vành bezel gốm hai màu xanh-đen mạnh mẽ, 'Batman' mang một vẻ ngoài hiện đại và kỹ thuật hơn. Nó là sự lựa chọn của những người yêu thích công nghệ và sự chính xác, một công cụ đắc lực cho những ai thường xuyên di chuyển giữa các múi giờ.",
                                                16500.00, 15, "/images/rolex-gmt-master-ii-batman-126710blnr.png",
                                                gmtMaster),
                                new Product("Rolex GMT-Master II 'Root Beer' 126711CHNR",
                                                "Sự kết hợp ấm áp và sang trọng giữa thép Oystersteel và vàng Everose 18 ct. Vành bezel Cerachrom hai màu nâu-đen độc đáo, được mệnh danh là 'Root Beer', mang đến một phong cách hoài cổ nhưng vẫn đầy đẳng cấp và khác biệt.",
                                                17500.00, 10, "/images/rolex-gmt-master-ii-root-beer-126711chnr.png",
                                                gmtMaster),
                                new Product("Rolex GMT-Master II 'Sprite' 126720VTNR",
                                                "Một thiết kế đột phá dành cho người thuận tay trái, với núm vặn và ô lịch ngày được dời sang vị trí 9 giờ. Vành bezel xanh-đen độc đáo khiến nó có biệt danh 'Sprite', là một tuyên ngôn về sự khác biệt và cá tính mạnh mẽ.",
                                                22000.00, 8, "/images/rolex-gmt-master-ii-sprite-126720vtnr.png",
                                                gmtMaster),
                                new Product("Rolex GMT-Master II Full Gold 116718LN",
                                                "Hiện thân của quyền lực và sự sang trọng tuyệt đối, phiên bản này được chế tác từ vàng vàng 18 ct nguyên khối. Mặt số xanh lá cây kỷ niệm kết hợp với vành bezel Cerachrom đen tạo nên một chiếc đồng hồ không thể bị lu mờ, là biểu tượng đỉnh cao của dòng GMT-Master II.",
                                                45000.00, 5, "/images/rolex-gmt-master-ii-full-gold-116718ln.png",
                                                gmtMaster),

                                // Rolex - Sky-Dweller
                                new Product("Rolex Sky-Dweller Blue Dial 326934",
                                                "Một trong những chiếc đồng hồ phức tạp nhất của Rolex, Sky-Dweller sở hữu múi giờ kép và lịch thường niên Saros thông minh. Mặt số xanh dương 'blue dial' là phiên bản được săn lùng nhất, kết hợp hoàn hảo giữa kỹ thuật đỉnh cao và vẻ đẹp thể thao thanh lịch.",
                                                18500.00, 7, "/images/rolex-sky-dweller-blue-dial-326934.png",
                                                skyDweller),
                                new Product("Rolex Sky-Dweller Everose Gold",
                                                "Sự kết hợp vương giả giữa vỏ vàng Everose 18 ct và mặt số màu chocolate hoặc xám ardoise. Đây là chiếc đồng hồ dành cho những nhà lãnh đạo toàn cầu, những người cần một công cụ thời gian mạnh mẽ mà vẫn giữ được phong thái sang trọng bậc nhất.",
                                                50900.00, 4, "/images/rolex-sky-dweller-everose-gold.png", skyDweller),
                                new Product("Rolex Sky-Dweller Yellow Gold",
                                                "Phiên bản vàng vàng 18 ct cổ điển với mặt số màu champagne hoặc đen, toát lên vẻ quyền lực và thịnh vượng. Vành bezel Ring Command là một tuyệt tác kỹ thuật, cho phép điều chỉnh tất cả các chức năng một cách trực quan.",
                                                48500.00, 5, "/images/rolex-sky-dweller-yellow-gold.png", skyDweller),
                                new Product("Rolex Sky-Dweller Black Dial",
                                                "Phiên bản Rolesor vàng-thép với mặt số đen mang đến vẻ ngoài mạnh mẽ và linh hoạt. Nó là sự cân bằng hoàn hảo giữa sự phức tạp của bộ máy và tính ứng dụng hàng ngày, phù hợp với mọi bối cảnh từ phòng họp đến những chuyến du lịch.",
                                                17900.00, 9, "/images/rolex-sky-dweller-black-dial.png", skyDweller),
                                new Product("Rolex Sky-Dweller White Dial",
                                                "Vẻ đẹp tinh khiết và rõ ràng của mặt số trắng làm nổi bật các chi tiết kỹ thuật phức tạp của Sky-Dweller. Phiên bản Rolesor vàng-thép này là một lựa chọn thanh lịch, dễ đọc và thể hiện đẳng cấp một cách tinh tế.",
                                                17500.00, 11, "/images/rolex-sky-dweller-white-dial.png", skyDweller),

                                // Rolex - Explorer
                                new Product("Rolex Explorer 36mm 124270",
                                                "Trở về với kích thước 36mm nguyên bản, đây là chiếc đồng hồ của những nhà thám hiểm, được thử thách trên đỉnh Everest. Thiết kế đơn giản với cọc số 3-6-9 đặc trưng và dạ quang Chromalight xanh lam đảm bảo khả năng đọc giờ hoàn hảo trong mọi điều kiện.",
                                                7850.00, 18, "/images/rolex-explorer-36mm-124270.png", explorer),
                                new Product("Rolex Explorer 40mm 224270",
                                                "Phiên bản 40mm hiện đại, mang lại sự hiện diện mạnh mẽ hơn trên cổ tay mà vẫn giữ nguyên tinh thần tối giản và bền bỉ của dòng Explorer. Một công cụ đáng tin cậy cho những cuộc phiêu lưu hàng ngày.",
                                                8100.00, 20, "/images/rolex-explorer-40mm-224270.png", explorer),
                                new Product("Rolex Explorer II 'Polar' 226570",
                                                "Được thiết kế cho các nhà thám hiểm hang động, Explorer II có kim GMT 24 giờ màu cam nổi bật để phân biệt ngày và đêm. Mặt số trắng 'Polar' mang lại độ tương phản tối đa, là một biểu tượng của sự bền bỉ và khám phá.",
                                                11200.00, 12, "/images/rolex-explorer-ii-polar-226570.png", explorer),
                                new Product("Rolex Explorer II Black Dial 226570",
                                                "Phiên bản mặt số đen của Explorer II tạo ra một vẻ ngoài cổ điển và mạnh mẽ. Các cọc số và kim được phủ dạ quang Chromalight, đảm bảo khả năng hiển thị vượt trội trong bóng tối, kế thừa di sản thám hiểm của Rolex.",
                                                10900.00, 14, "/images/rolex-explorer-ii-black-dial-226570.png",
                                                explorer),
                                new Product("Rolex Explorer Two-Tone 124273",
                                                "Lần đầu tiên dòng Explorer được khoác lên mình chất liệu Rolesor vàng-thép. Sự kết hợp này mang đến một nét sang trọng bất ngờ cho một chiếc đồng hồ công cụ, tạo ra một phiên bản độc đáo, vừa thể thao vừa lịch lãm.",
                                                11500.00, 10, "/images/rolex-explorer-two-tone-124273.png", explorer),

                                // Patek Philippe - Nautilus
                                new Product("Patek Philippe Nautilus 5811/1G",
                                                "Kế thừa di sản của huyền thoại 5711, phiên bản 5811 bằng vàng trắng là định nghĩa của đồng hồ thể thao sang trọng. Mặt số xanh lam chuyển sắc đặc trưng, bộ vỏ với thiết kế 'porthole' kinh điển của Gérald Genta, và bộ máy Caliber 26-330 S C tinh xảo có thể chiêm ngưỡng qua nắp lưng sapphire. Đây là một biểu tượng của đẳng cấp và sự khan hiếm.",
                                                72500.00, 5, "/images/patek-philippe-nautilus-5811-1g.png", nautilus),
                                new Product("Patek Philippe Nautilus Travel Time Chronograph 5990/1A",
                                                "Một kiệt tác cơ khí phức tạp dành cho du khách toàn cầu. Mẫu 5990 kết hợp chức năng chronograph flyback, múi giờ kép (Travel Time) và lịch ngày, tất cả gói gọn trong bộ vỏ thép không gỉ đặc trưng của Nautilus. Một công cụ mạnh mẽ cho những người đàn ông luôn dịch chuyển.",
                                                68600.00, 4, "/images/patek-philippe-nautilus-travel-time-5990-1a.png",
                                                nautilus),
                                new Product("Patek Philippe Nautilus Moon Phase 5712/1A",
                                                "Sự lãng mạn của thiên văn học hội tụ trong thiết kế thể thao. Mẫu 5712 hiển thị lịch tuần trăng, ngày và chỉ báo năng lượng dự trữ trên một mặt số bất đối xứng độc đáo. Vẻ đẹp của sự phức tạp được thể hiện một cách đầy nghệ thuật và tinh tế.",
                                                55000.00, 6, "/images/patek-philippe-nautilus-moon-phase-5712-1a.png",
                                                nautilus),
                                new Product("Patek Philippe Nautilus Rose Gold 5711/1R",
                                                "Phiên bản vàng hồng nguyên khối của huyền thoại 5711 là hiện thân của sự xa hoa tột đỉnh. Sắc ấm của vàng hồng kết hợp với mặt số nâu chocolate chuyển sắc tạo nên một tổng thể hài hòa, sang trọng và đầy quyền lực. Một chiếc đồng hồ không chỉ để xem giờ, mà để khẳng định vị thế.",
                                                115000.00, 3, "/images/patek-philippe-nautilus-rose-gold-5711-1r.png",
                                                nautilus),
                                new Product("Patek Philippe Nautilus Annual Calendar 5726/1A",
                                                "Sự tiện dụng của chức năng lịch thường niên thông minh, chỉ cần chỉnh một lần mỗi năm, được tích hợp vào bộ vỏ Nautilus. Mặt số màu xám hiển thị đầy đủ thứ, ngày, tháng và tuần trăng, là sự kết hợp hoàn hảo giữa tính ứng dụng hàng ngày và thiết kế biểu tượng.",
                                                52000.00, 7,
                                                "/images/patek-philippe-nautilus-annual-calendar-5726-1a.png",
                                                nautilus),

                                // Patek Philippe - Calatrava
                                new Product("Patek Philippe Calatrava 6119R",
                                                "Tinh hoa của đồng hồ dress watch, Calatrava 6119R bằng vàng hồng là biểu tượng của sự thanh lịch thuần khiết. Vành bezel được trang trí họa tiết 'Clous de Paris' guilloché thủ công, một di sản của Patek Philippe. Thiết kế tối giản, kim và cọc số sắc nét, đây là chiếc đồng hồ hoàn hảo cho những bộ suit may đo và những dịp trang trọng nhất.",
                                                31980.00, 10, "/images/patek-philippe-calatrava-6119r.png", calatrava),
                                new Product("Patek Philippe Calatrava 5227G",
                                                "Sự tinh xảo ẩn giấu trong vẻ ngoài tối giản. Mẫu 5227G bằng vàng trắng sở hữu một nắp lưng 'officer's style' có bản lề vô hình, cho phép người đeo mở ra để chiêm ngưỡng bộ máy Caliber 324 S C tuyệt đẹp. Một chi tiết bí mật dành cho những người sành sỏi.",
                                                40500.00, 8, "/images/patek-philippe-calatrava-5227g.png", calatrava),
                                new Product("Patek Philippe Calatrava Pilot Travel Time 7234G",
                                                "Patek Philippe mang di sản đồng hồ phi công của mình vào bộ sưu tập Calatrava. Mẫu Pilot Travel Time với chức năng múi giờ kép, các nút bấm lớn và mặt số xanh xám dễ đọc, là sự kết hợp độc đáo giữa phong cách cổ điển và tinh thần phiêu lưu.",
                                                51000.00, 6,
                                                "/images/patek-philippe-calatrava-pilot-travel-time-7234g.png",
                                                calatrava),
                                new Product("Patek Philippe Calatrava Weekly Calendar 5212A",
                                                "Một chức năng phức tạp hoàn toàn mới, hiển thị số tuần trong năm bên cạnh thứ và ngày. Được chế tác từ thép không gỉ, một chất liệu hiếm thấy ở Patek Philippe, cùng với mặt số có các font chữ viết tay độc đáo, mẫu 5212A là một chiếc đồng hồ đầy cá tính và học thức.",
                                                38600.00, 9,
                                                "/images/patek-philippe-calatrava-weekly-calendar-5212a.png",
                                                calatrava),
                                new Product("Patek Philippe Calatrava Platinum 5196P",
                                                "Sự sang trọng thầm lặng của bạch kim, chất liệu quý giá nhất. Mẫu 5196P tôn vinh thiết kế Calatrava nguyên bản từ những năm 1930 với mặt số xám hai tông màu và cọc số Breguet thanh lịch. Đây là chiếc đồng hồ dành cho những ai trân trọng giá trị vĩnh cửu hơn là sự phô trương.",
                                                45000.00, 5, "/images/patek-philippe-calatrava-platinum-5196p.png",
                                                calatrava),

                                // Patek Philippe - Aquanaut
                                new Product("Patek Philippe Aquanaut 5167A",
                                                "Ra đời như một phiên bản trẻ trung và hiện đại hơn của Nautilus, Aquanaut nhanh chóng trở thành một biểu tượng. Mặt số với họa tiết bàn cờ nổi, bộ vỏ bát giác bo tròn và dây đeo 'Tropical' bằng composite siêu bền, chống lại nước mặn và tia UV. Một chiếc đồng hồ thể thao sang trọng cho mọi cuộc phiêu lưu.",
                                                24860.00, 12, "/images/patek-philippe-aquanaut-5167a.png", aquanaut),
                                new Product("Patek Philippe Aquanaut Travel Time 5164A",
                                                "Người bạn đồng hành lý tưởng cho những chuyến đi. Mẫu 5164A tích hợp chức năng múi giờ kép cực kỳ trực quan, cho phép điều chỉnh giờ địa phương tiến hoặc lùi một cách dễ dàng bằng hai nút bấm bên trái vỏ. Tất cả được gói gọn trong thiết kế thể thao đặc trưng của Aquanaut.",
                                                42500.00, 8, "/images/patek-philippe-aquanaut-travel-time-5164a.png",
                                                aquanaut),
                                new Product("Patek Philippe Aquanaut Chronograph 5968A",
                                                "Lần đầu tiên chức năng chronograph được tích hợp vào dòng Aquanaut vỏ thép, tạo nên một chiếc đồng hồ thể thao đầy năng động. Các chi tiết màu cam nổi bật trên mặt số và dây đeo tạo nên một vẻ ngoài trẻ trung, phá cách, thu hút mọi ánh nhìn.",
                                                51000.00, 7, "/images/patek-philippe-aquanaut-chronograph-5968a.png",
                                                aquanaut),
                                new Product("Patek Philippe Aquanaut 'Khaki Green' 5168G",
                                                "Một phiên bản sành điệu với bộ vỏ vàng trắng và mặt số cùng dây đeo màu xanh khaki quân đội. Kích thước 'Jumbo' 42.2mm mang lại sự hiện diện mạnh mẽ trên cổ tay, là sự kết hợp giữa phong cách quân đội và sự sang trọng đỉnh cao.",
                                                49500.00, 6, "/images/patek-philippe-aquanaut-khaki-green-5168g.png",
                                                aquanaut),
                                new Product("Patek Philippe Aquanaut Luce Rose Gold 5267/200A",
                                                "Dành cho những người yêu thích sự lấp lánh, phiên bản Luce (Ánh sáng) có vành bezel được nạm 48 viên kim cương tinh xảo. Sự kết hợp giữa vẻ đẹp trang sức và tinh thần thể thao của Aquanaut tạo nên một chiếc đồng hồ độc đáo và quyến rũ.",
                                                20500.00, 9,
                                                "/images/patek-philippe-aquanaut-luce-rose-gold-5267-200a.png",
                                                aquanaut),

                                // Patek Philippe - Grand Complications
                                new Product("Patek Philippe Grand Complications Perpetual Calendar 5327G",
                                                "Đỉnh cao của nghệ thuật chế tác đồng hồ, Lịch Vạn Niên là một trong những chức năng phức tạp danh giá nhất. Mẫu 5327G bằng vàng trắng hiển thị đầy đủ thứ, ngày, tháng, năm nhuận và lịch tuần trăng, tất cả sẽ tự động chính xác cho đến năm 2100. Một di sản để đời.",
                                                98500.00, 3, "/images/patek-philippe-grand-complications-5327g.png",
                                                grandComplications),
                                new Product("Patek Philippe Grand Complications Split-Seconds Chronograph 5370P",
                                                "Chức năng Split-Seconds (Rattrapante) cho phép đo hai khoảng thời gian độc lập, là một trong những cơ chế chronograph phức tạp nhất. Được chế tác từ bạch kim với mặt số men đen sâu thẳm, 5370P là một kiệt tác dành cho những nhà sưu tầm am tường nhất.",
                                                275000.00, 2,
                                                "/images/patek-philippe-grand-complications-split-seconds-chronograph-5370p.png",
                                                grandComplications),
                                new Product("Patek Philippe Grand Complications Minute Repeater 5178G",
                                                "Chức năng Điểm chuông theo phút (Minute Repeater) biến chiếc đồng hồ thành một nhạc cụ cơ khí, có khả năng phát ra âm thanh trong trẻo để báo giờ, quý và phút theo yêu cầu. Mỗi chiếc đều là một tác phẩm nghệ thuật độc nhất, được lắp ráp bởi những nghệ nhân bậc thầy.",
                                                450000.00, 1,
                                                "/images/patek-philippe-grand-complications-minute-repeater-5178g.png",
                                                grandComplications),
                                new Product("Patek Philippe Grand Complications Sky Moon Tourbillon 6002R",
                                                "Một trong những chiếc đồng hồ đeo tay phức tạp nhất thế giới, Sky Moon Tourbillon có hai mặt số. Mặt trước hiển thị lịch vạn niên, mặt sau là một bản đồ thiên văn chi tiết. Chức năng Tourbillon và Minute Repeater càng làm tăng thêm giá trị cho siêu phẩm này.",
                                                1500000.00, 1,
                                                "/images/patek-philippe-grand-complications-sky-moon-tourbillon-6002r.png",
                                                grandComplications),
                                new Product("Patek Philippe Grand Complications Chronograph Perpetual Calendar 5270P",
                                                "Sự kết hợp kinh điển của hai chức năng phức tạp được yêu thích nhất: Chronograph và Lịch Vạn Niên. Phiên bản bạch kim với mặt số màu cá hồi (salmon) là một thiết kế được giới sưu tầm đặc biệt ưa chuộng, thể hiện sự cân bằng hoàn hảo giữa kỹ thuật và thẩm mỹ.",
                                                210000.00, 2,
                                                "/images/patek-philippe-grand-complications-chronograph-perpetual-calendar-5270p.png",
                                                grandComplications),

                                // Patek Philippe - World Time
                                new Product("Patek Philippe World Time 5230P",
                                                "Công cụ tối thượng dành cho du khách và doanh nhân toàn cầu, World Time hiển thị cùng lúc 24 múi giờ trên thế giới. Mặt số được trang trí bằng họa tiết guilloché thủ công tinh xảo, và chỉ cần một nút bấm để thay đổi múi giờ chính khi bạn di chuyển đến một thành phố mới.",
                                                71200.00, 4, "/images/patek-philippe-world-time-5230p.png", worldTime),
                                new Product("Patek Philippe World Time Chronograph 5930G",
                                                "Sự kết hợp lần đầu tiên giữa hai chức năng World Time và Chronograph trong một chiếc đồng hồ sản xuất hàng loạt của Patek. Mặt số xanh lam guilloché và bộ vỏ vàng trắng tạo nên một vẻ ngoài vừa phức tạp vừa thể thao.",
                                                82500.00, 3, "/images/patek-philippe-world-time-chronograph-5930g.png",
                                                worldTime),
                                new Product("Patek Philippe World Time Minute Repeater 5531R",
                                                "Một siêu phẩm kết hợp 3 chức năng phức tạp: World Time, Minute Repeater và mặt số tráng men Cloisonné mô tả bản đồ. Chiếc đồng hồ này có thể điểm chuông theo giờ địa phương, một thành tựu kỹ thuật độc đáo.",
                                                560000.00, 1,
                                                "/images/patek-philippe-world-time-minute-repeater-5531r.png",
                                                worldTime),
                                new Product("Patek Philippe Ladies' World Time 7130R",
                                                "Phiên bản World Time dành cho phái nữ, với bộ vỏ vàng hồng thanh lịch và vành bezel nạm kim cương. Mặt số màu kem ngà với họa tiết guilloché, là sự kết hợp hoàn hảo giữa vẻ đẹp trang sức và chức năng phức tạp.",
                                                56500.00, 5, "/images/patek-philippe-ladies-world-time-7130r.png",
                                                worldTime),
                                new Product("Patek Philippe World Time 'New York' 5230G-012",
                                                "Phiên bản giới hạn tôn vinh triển lãm 'The Art of Watches' tại New York. Mặt số trung tâm mô tả đường chân trời của Manhattan, một tác phẩm nghệ thuật thực sự dành cho các nhà sưu tầm.",
                                                65000.00, 2, "/images/patek-philippe-world-time-new-york-5230g-012.png",
                                                worldTime),

                                // Audemars Piguet - Royal Oak
                                new Product("Audemars Piguet Royal Oak 'Jumbo' Extra-Thin 16202ST",
                                                "Là hậu duệ trực tiếp của mẫu Royal Oak nguyên bản năm 1972, phiên bản 'Jumbo' Extra-Thin là một biểu tượng sống của ngành chế tác đồng hồ. Bộ vỏ thép 39mm siêu mỏng, vành bezel bát giác cố định bởi 8 ốc vít lục giác bằng vàng trắng, và mặt số 'Petite Tapisserie' màu xanh lam 'Bleu Nuit, Nuage 50' đặc trưng. Sở hữu nó là sở hữu một phần lịch sử.",
                                                78300.00, 6, "/images/audemars-piguet-royal-oak-jumbo-16202st.png",
                                                royalOak),
                                new Product("Audemars Piguet Royal Oak Selfwinding Chronograph 41mm",
                                                "Sự kết hợp hoàn hảo giữa thiết kế biểu tượng và chức năng thể thao. Mẫu chronograph này có bộ vỏ 41mm mạnh mẽ, các mặt số phụ được bố trí lại để tăng tính đối xứng và dễ đọc. Mặt số 'Grande Tapisserie' tạo hiệu ứng chiều sâu, bắt sáng tuyệt đẹp dưới mọi góc nhìn.",
                                                35800.00, 10, "/images/audemars-piguet-royal-oak-chronograph-41mm.png",
                                                royalOak),
                                new Product("Audemars Piguet Royal Oak Frosted Gold",
                                                "Một tác phẩm nghệ thuật lấp lánh, kỹ thuật hoàn thiện 'Frosted Gold' được thực hiện thủ công bằng cách dùng một công cụ có đầu kim cương để tạo ra hàng ngàn vết lõm siêu nhỏ trên bề mặt vàng. Kết quả là một hiệu ứng lấp lánh như bụi sao, biến chiếc đồng hồ thành một món trang sức độc đáo.",
                                                61500.00, 7, "/images/audemars-piguet-royal-oak-frosted-gold.png",
                                                royalOak),
                                new Product("Audemars Piguet Royal Oak Perpetual Calendar",
                                                "Một kiệt tác cơ khí hiển thị đầy đủ thông tin lịch vạn niên (thứ, ngày, tháng, năm nhuận) và lịch tuần trăng thiên văn. Bộ vỏ bằng gốm đen siêu nhẹ, chống xước và cực kỳ hiện đại, là minh chứng cho khả năng đổi mới không ngừng của Audemars Piguet.",
                                                105600.00, 3,
                                                "/images/audemars-piguet-royal-oak-perpetual-calendar.png", royalOak),
                                new Product("Audemars Piguet Royal Oak Tourbillon Extra-Thin",
                                                "Trái tim của chiếc đồng hồ là lồng Tourbillon tinh xảo, một cơ chế phức tạp chống lại tác động của trọng lực để tăng độ chính xác. Mặt số 'Tapisserie Evolutive' với họa tiết tỏa ra từ lồng Tourbillon tạo nên một hiệu ứng thị giác đầy mê hoặc. Đây là đỉnh cao của nghệ thuật chế tác đồng hồ.",
                                                175000.00, 2,
                                                "/images/audemars-piguet-royal-oak-tourbillon-extra-thin.png",
                                                royalOak),

                                // Audemars Piguet - Royal Oak Offshore
                                new Product("Audemars Piguet Royal Oak Offshore Selfwinding Chronograph 43mm",
                                                "Một phiên bản mạnh mẽ, cơ bắp và thể thao hơn của Royal Oak. Offshore Chronograph có bộ vỏ 43mm bằng thép không gỉ, các nút bấm chronograph được thiết kế lại chắc chắn và hệ thống dây đeo có thể thay thế dễ dàng. Mặt số 'Méga Tapisserie' tạo nên một vẻ ngoài hầm hố và nam tính.",
                                                42400.00, 9,
                                                "/images/audemars-piguet-royal-oak-offshore-chrono-43mm.png",
                                                royalOakOffshore),
                                new Product("Audemars Piguet Royal Oak Offshore Diver",
                                                "Được chế tác để chinh phục đại dương, Offshore Diver có khả năng chống nước 300 mét và vành bezel xoay bên trong, được điều khiển bởi một núm vặn ở vị trí 10 giờ. Mặt số 'Méga Tapisserie' với các cọc số lớn đảm bảo khả năng đọc giờ hoàn hảo dưới nước.",
                                                29100.00, 12, "/images/audemars-piguet-royal-oak-offshore-diver.png",
                                                royalOakOffshore),
                                new Product("Audemars Piguet Royal Oak Offshore 'The Beast' 25th Anniversary",
                                                "Tái hiện lại mẫu Offshore đầu tiên năm 1993, biệt danh 'The Beast' vì kích thước và thiết kế táo bạo của nó. Phiên bản kỷ niệm này giữ nguyên mặt số xanh dương và các nút bấm bọc cao su, là một biểu tượng của sự phá cách trong ngành đồng hồ.",
                                                58000.00, 5, "/images/audemars-piguet-royal-oak-offshore-the-beast.png",
                                                royalOakOffshore),
                                new Product("Audemars Piguet Royal Oak Offshore Tourbillon Chronograph",
                                                "Sự kết hợp của những chức năng phức tạp nhất trong một bộ vỏ Offshore hiện đại. Lồng Tourbillon và bộ máy chronograph lộ cơ hoàn toàn qua mặt số skeleton, phô diễn vẻ đẹp cơ khí và kỹ thuật chế tác đỉnh cao của Audemars Piguet.",
                                                225000.00, 2,
                                                "/images/audemars-piguet-royal-oak-offshore-tourbillon-chrono.png",
                                                royalOakOffshore),
                                new Product("Audemars Piguet Royal Oak Offshore Music Edition",
                                                "Một phiên bản đầy màu sắc và vui tươi, lấy cảm hứng từ các bộ chỉnh âm thanh (equalizer). Mặt số 'Tapisserie' được trang trí bằng các họa tiết đá quý nhiều màu sắc mô phỏng các cột sóng âm. Một chiếc đồng hồ độc đáo dành cho những người yêu âm nhạc và không ngại thể hiện cá tính.",
                                                65000.00, 4,
                                                "/images/audemars-piguet-royal-oak-offshore-music-edition.png",
                                                royalOakOffshore),
                                // Omega - Seamaster
                                new Product("Omega Seamaster Diver 300M 007 Edition",
                                                "Giống hệt chiếc đồng hồ James Bond đã đeo trong 'No Time To Die', phiên bản này được chế tác từ titan cấp 2 siêu nhẹ và bền bỉ. Thiết kế mang đậm phong cách quân đội cổ điển với các chi tiết màu 'tropical' độc đáo, mặt số và vành bezel bằng nhôm, cùng biểu tượng 'mũi tên broad arrow' của quân đội Anh. Một chiếc đồng hồ công cụ thực thụ.",
                                                9200.00, 25, "/images/omega-seamaster-diver-300m-007-edition.png",
                                                seamaster),
                                new Product("Omega Seamaster Diver 300M Black Dial",
                                                "Phiên bản kinh điển đã làm nên tên tuổi của dòng Seamaster 300M. Mặt số bằng gốm [ZrO2] đen được khắc laser họa tiết sóng đặc trưng, vành bezel gốm, và van thoát khí heli ở vị trí 10 giờ. Trái tim của nó là bộ máy Co-Axial Master Chronometer Calibre 8800, kháng từ lên đến 15,000 gauss.",
                                                5400.00, 30, "/images/omega-seamaster-diver-300m-black-dial.png",
                                                seamaster),
                                new Product("Omega Seamaster Aqua Terra 150M Worldtimer",
                                                "Một kiệt tác dành cho du khách toàn cầu, mặt số của Worldtimer có một bản đồ Trái Đất được khắc laser trên một đĩa titan cấp 5. Vòng ngoài hiển thị tên 24 thành phố, cho phép xem giờ ở mọi nơi trên thế giới. Sự kết hợp hoàn hảo giữa chức năng phức tạp và vẻ đẹp nghệ thuật.",
                                                9100.00, 15, "/images/omega-seamaster-aqua-terra-150m-worldtimer.png",
                                                seamaster),
                                new Product("Omega Seamaster Planet Ocean 600M",
                                                "Được chế tác để chinh phục những vùng biển sâu nhất, Planet Ocean có khả năng chống nước lên đến 600 mét. Vành bezel gốm màu cam nổi bật là một dấu ấn đặc trưng, cùng bộ máy Co-Axial Master Chronometer và chứng nhận METAS đảm bảo độ chính xác và bền bỉ tuyệt đối.",
                                                6900.00, 18, "/images/omega-seamaster-planet-ocean-600m.png",
                                                seamaster),
                                new Product("Omega Seamaster Ploprof 1200M",
                                                "Với thiết kế bất đối xứng độc đáo và khả năng lặn sâu ấn tượng 1200 mét, Ploprof (PLOngeur PROFessionnel) là chiếc đồng hồ dành cho các thợ lặn chuyên nghiệp. Nút khóa an ninh cho vành bezel và hệ thống khóa kép trên dây đeo đảm bảo an toàn tuyệt đối trong những điều kiện khắc nghiệt nhất.",
                                                12600.00, 5, "/images/omega-seamaster-ploprof-1200m.png", seamaster),

                                // Omega - Speedmaster
                                new Product("Omega Speedmaster Moonwatch Professional",
                                                "Chiếc đồng hồ đầu tiên và duy nhất được đeo trên Mặt Trăng, Speedmaster Moonwatch là một huyền thoại sống của ngành hàng không vũ trụ. Phiên bản hiện đại trang bị bộ máy Co-Axial Master Chronometer Calibre 3861, kế thừa trọn vẹn thiết kế kinh điển đã được NASA chứng nhận cho các chuyến bay vào không gian.",
                                                7600.00, 22, "/images/omega-speedmaster-moonwatch-professional.png",
                                                speedmaster),
                                new Product("Omega Speedmaster 'Silver Snoopy Award' 50th Anniversary",
                                                "Một phiên bản đặc biệt kỷ niệm giải thưởng 'Silver Snoopy' mà NASA đã trao cho Omega. Mặt số bạc, các chi tiết xanh dương, và đặc biệt là hình ảnh chú chó Snoopy trong tàu Apollo trên mặt số phụ. Nắp lưng có một cơ chế tự động độc đáo: Snoopy sẽ bay quanh Mặt Trăng khi chức năng chronograph được kích hoạt.",
                                                11500.00, 10, "/images/omega-speedmaster-silver-snoopy-award.png",
                                                speedmaster),
                                new Product("Omega Speedmaster Dark Side of the Moon 'Apollo 8'",
                                                "Tôn vinh sứ mệnh Apollo 8, chiếc đồng hồ này có bộ vỏ hoàn toàn bằng gốm đen. Mặt số skeleton được khắc laser để mô phỏng bề mặt của Mặt Trăng, cho phép chiêm ngưỡng bộ máy Calibre 1869 đã được làm đen và trang trí đặc biệt. Một tác phẩm nghệ thuật cơ khí đầy ấn tượng.",
                                                10800.00, 8,
                                                "/images/omega-speedmaster-dark-side-of-the-moon-apollo-8.png",
                                                speedmaster),
                                new Product("Omega Speedmaster Chronoscope",
                                                "Lấy cảm hứng từ những mẫu chronograph của Omega từ những năm 1940, Chronoscope có mặt số phức tạp với ba thang đo: Tachymeter (đo tốc độ), Telemeter (đo khoảng cách) và Pulsometer (đo nhịp tim). Một công cụ đo lường chính xác mang đậm phong cách cổ điển.",
                                                8650.00, 15, "/images/omega-speedmaster-chronoscope.png", speedmaster),
                                new Product("Omega Speedmaster '57 Co-Axial Chronograph",
                                                "Tái hiện lại mẫu Speedmaster đầu tiên từ năm 1957, phiên bản này có bộ vỏ thép đối xứng, kim 'Broad Arrow' đặc trưng và vành bezel bằng thép. Bộ máy Co-Axial Calibre 9300 mạnh mẽ với hai mặt số phụ, mang lại một vẻ ngoài cân đối và cổ điển.",
                                                9500.00, 13, "/images/omega-speedmaster-57-co-axial-chronograph.png",
                                                speedmaster),

                                // Omega - Constellation
                                new Product("Omega Constellation Globemaster",
                                                "Là mẫu đồng hồ đầu tiên trên thế giới đạt chứng nhận Master Chronometer của METAS, Globemaster đặt ra một tiêu chuẩn mới về độ chính xác. Thiết kế nổi bật với mặt số 'Pie Pan' lấy cảm hứng từ mẫu 1952 và vành bezel khía rãnh bằng tungsten carbide siêu cứng.",
                                                7700.00, 18, "/images/omega-constellation-globemaster.png",
                                                constellation),
                                new Product("Omega Constellation Manhattan 41mm",
                                                "Thiết kế biểu tượng với bốn 'móng vuốt' (griffes) đặc trưng trên vành bezel. Phiên bản 41mm hiện đại có vành bezel bằng gốm, dây đeo được tích hợp liền mạch vào vỏ, và bộ máy Co-Axial Master Chronometer có thể chiêm ngưỡng qua nắp lưng sapphire.",
                                                9300.00, 16, "/images/omega-constellation-manhattan-41mm.png",
                                                constellation),
                                new Product("Omega Constellation Aventurine Dial",
                                                "Một phiên bản dành cho những ai yêu thích vẻ đẹp của vũ trụ. Mặt số được làm từ đá aventurine, một loại thủy tinh có chứa các mảnh đồng nhỏ lấp lánh, tạo hiệu ứng như một bầu trời đêm đầy sao. Mỗi mặt số là một tác phẩm độc nhất.",
                                                12500.00, 9, "/images/omega-constellation-aventurine-dial.png",
                                                constellation),
                                new Product("Omega Constellation Co-Axial Day-Date",
                                                "Phiên bản phức tạp hơn với chức năng hiển thị cả ngày và thứ. Cửa sổ hiển thị thứ được đặt ở vị trí 12 giờ, tạo sự cân đối cho mặt số. Một chiếc đồng hồ thanh lịch và cực kỳ hữu dụng cho công việc hàng ngày.",
                                                11200.00, 11, "/images/omega-constellation-co-axial-day-date.png",
                                                constellation),
                                new Product("Omega Constellation Sedna™ Gold",
                                                "Chế tác từ Sedna™ Gold, một hợp kim vàng hồng 18k độc quyền của Omega có khả năng giữ màu bền bỉ. Sự kết hợp giữa sắc vàng ấm áp và thiết kế Constellation kinh điển tạo nên một chiếc đồng hồ sang trọng và đẳng cấp vượt thời gian.",
                                                24500.00, 7, "/images/omega-constellation-sedna-gold.png",
                                                constellation),

                                // Omega - De Ville
                                new Product("Omega De Ville Prestige Co-Axial",
                                                "Đại diện cho thiết kế cổ điển, thuần khiết và thanh lịch, De Ville Prestige là sự lựa chọn hoàn hảo cho những dịp trang trọng. Mặt số tối giản, kim và cọc số thanh mảnh, cùng bộ máy Co-Axial đảm bảo hiệu suất hoạt động bền bỉ và chính xác.",
                                                4750.00, 30, "/images/omega-de-ville-prestige-co-axial.png", deVille),
                                new Product("Omega De Ville Trésor Power Reserve",
                                                "Một chiếc đồng hồ dress watch tinh tế với chức năng chỉ báo năng lượng dự trữ ở vị trí 12 giờ và mặt số phụ cho giây ở vị trí 6 giờ. Bộ vỏ mỏng thanh lịch và bộ máy lên cót tay Master Chronometer là sự lựa chọn của những quý ông sành điệu.",
                                                8100.00, 14, "/images/omega-de-ville-tresor-power-reserve.png",
                                                deVille),
                                new Product("Omega De Ville Hour Vision",
                                                "Điểm đặc biệt của Hour Vision là phần vỏ bên hông được làm bằng sapphire, cho phép người đeo chiêm ngưỡng một phần của bộ máy Co-Axial Calibre 8500 từ bên cạnh. Một thiết kế độc đáo, phô diễn vẻ đẹp cơ khí một cách tinh tế.",
                                                7900.00, 12, "/images/omega-de-ville-hour-vision.png", deVille),
                                new Product("Omega De Ville Tourbillon Numbered Edition",
                                                "Đỉnh cao của nghệ thuật chế tác đồng hồ Omega, đây là chiếc đồng hồ đeo tay đầu tiên của hãng có lồng Tourbillon trung tâm và đạt chứng nhận Master Chronometer. Bộ máy được hoàn thiện thủ công tinh xảo, có thể chiêm ngưỡng qua nắp lưng sapphire. Mỗi chiếc đều được đánh số thứ tự riêng.",
                                                168000.00, 2, "/images/omega-de-ville-tourbillon-numbered-edition.png",
                                                deVille),
                                new Product("Omega De Ville Ladymatic",
                                                "Một biểu tượng của sự nữ tính và kỹ thuật cơ khí. Ladymatic có mặt số họa tiết 'Supernova' độc đáo, vành bezel nạm kim cương và bộ máy Co-Axial nhỏ gọn. Một chiếc đồng hồ dành cho những người phụ nữ vừa yêu cái đẹp, vừa trân trọng chất lượng cơ khí.",
                                                18500.00, 9, "/images/omega-de-ville-ladymatic.png", deVille),

                                // Cartier - Panthère de Cartier (Nữ)
                                new Product("Cartier Panthère de Cartier Watch, Medium Model",
                                                "Thiết kế biểu tượng, một món trang sức.", 24100.00, 12,
                                                "/images/cartier-panthere-de-cartier-medium.png", panthere),
                                new Product("Cartier Panthère de Cartier Watch, Small Model",
                                                "Phiên bản nhỏ nhắn bằng thép, thanh lịch.", 4150.00, 20,
                                                "/images/cartier-panthere-de-cartier-small.png", panthere),
                                new Product("Cartier Panthère de Cartier Watch, Rose Gold",
                                                "Chế tác từ vàng hồng, sang trọng.", 21000.00, 8,
                                                "/images/cartier-panthere-de-cartier-rose-gold.png", panthere),
                                new Product("Cartier Panthère de Cartier Watch, Diamond Bezel",
                                                "Vành bezel được nạm kim cương.", 28500.00, 5,
                                                "/images/cartier-panthere-de-cartier-diamond-bezel.png", panthere),

                                // Cartier - Ballon Bleu de Cartier (Nữ)
                                new Product("Cartier Ballon Bleu de Cartier 33mm Steel",
                                                "Vỏ thép, núm vặn đính đá spinel xanh.", 6200.00, 22,
                                                "/images/cartier-ballon-bleu-33mm-steel.png", ballonBleu),
                                new Product("Cartier Ballon Bleu de Cartier 36mm Rose Gold",
                                                "Vỏ vàng hồng, dây da cá sấu.", 18500.00, 9,
                                                "/images/cartier-ballon-bleu-36mm-rose-gold.png", ballonBleu),
                                new Product("Cartier Ballon Bleu de Cartier Diamond Markers",
                                                "Cọc số đính kim cương tinh tế.", 8300.00, 14,
                                                "/images/cartier-ballon-bleu-diamond-markers.png", ballonBleu),
                                new Product("Cartier Ballon Bleu de Cartier Two-Tone", "Kết hợp thép và vàng hồng.",
                                                10500.00, 16, "/images/cartier-ballon-bleu-two-tone.png", ballonBleu),

                                // Chopard - Happy Sport (Nữ)
                                new Product("Chopard Happy Sport 30mm Automatic",
                                                "Bảy viên kim cương 'nhảy múa' tự do.", 10500.00, 10,
                                                "/images/chopard-happy-sport-30mm-automatic.png", happySport),
                                new Product("Chopard Happy Sport The First", "Tái hiện lại mẫu Happy Sport đầu tiên.",
                                                12300.00, 7, "/images/chopard-happy-sport-the-first.png", happySport),
                                new Product("Chopard Happy Sport Rose Gold Diamond",
                                                "Vỏ vàng hồng và vành bezel nạm kim cương.", 22400.00, 5,
                                                "/images/chopard-happy-sport-rose-gold-diamond.png", happySport),
                                new Product("Chopard Happy Sport Blue Dial", "Mặt số xanh dương cùng 5 viên kim cương.",
                                                5300.00, 18, "/images/chopard-happy-sport-blue-dial.png", happySport),

                                // Bvlgari - Serpenti (Nữ)
                                new Product("Bvlgari Serpenti Tubogas Watch", "Thiết kế hình rắn cuộn quanh cổ tay.",
                                                13500.00, 11, "/images/bvlgari-serpenti-tubogas-watch.png", serpenti),
                                new Product("Bvlgari Serpenti Seduttori Watch",
                                                "Dây đeo cách điệu vảy rắn, mặt đồng hồ hình giọt nước.", 28900.00, 6,
                                                "/images/bvlgari-serpenti-seduttori-watch.png", serpenti),
                                new Product("Bvlgari Serpenti Spiga Watch", "Dây đeo bằng gốm đen, thiết kế hiện đại.",
                                                15200.00, 8, "/images/bvlgari-serpenti-spiga-watch.png", serpenti),
                                new Product("Bvlgari Serpenti Incantati Watch",
                                                "Chú rắn uốn lượn quanh vành bezel nạm kim cương.", 45000.00, 3,
                                                "/images/bvlgari-serpenti-incantati-watch.png", serpenti));
                productRepository.saveAll(products);
        }
}