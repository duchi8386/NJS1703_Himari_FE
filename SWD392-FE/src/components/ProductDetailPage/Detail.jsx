import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  InputNumber,
  Tabs,
  Card,
  Tag,
  Carousel,
  ConfigProvider,
  Collapse,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { moneyFormatter } from "../../utils/moneyFormatter";
import sampleProducts from "../../data/sampleProducts";
import "./Detail.css";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const carouselRef = useRef(null);
  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  useEffect(() => {
    // Tìm sản phẩm từ sample data
    const foundProduct = sampleProducts.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Row gutter={[32, 32]}>
        {/* Phần hình ảnh bên trái */}
        <Col xs={24} md={12}>
          <div className="relative">
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    arrowSize: 35,
                  },
                },
              }}
            >
              <Carousel
                autoplay
                arrows
                effect="fade"
                className="w-[736px] h-[496px]"
                ref={carouselRef}
              >
                {/* Chỉ render từ product.details.images */}
                {product.details?.images?.map((img, index) => (
                  <div key={index} className="w-[736px] h-[496px]">
                    <img
                      src={img}
                      alt={`${product.name}-${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="flex justify-center mt-4 gap-2">
                {/* Thumbnails cũng chỉ render từ product.details.images */}
                {product.details?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-20 h-20 rounded-md cursor-pointer border-2 border-gray-200"
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </ConfigProvider>
          </div>
          <Collapse
            className="product-collapse mt-8"
            expandIconPosition="end"
            items={[
              {
                key: "1",
                label: "Tổng Quan Về Sản Phẩm",
                children: (
                  <div>
                    <p>{product.details?.overview}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Lợi ích chính:</h4>
                      <ul className="list-disc pl-4">
                        {product.details?.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                key: "2",
                label: "Cách Sử Dụng",
                children: (
                  <ol className="list-decimal pl-4">
                    {product.details?.usage_steps.map((step, index) => (
                      <li key={index} className="mb-2 ">
                        {step}
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                key: "3",
                label: "Thành Phần",
                children: (
                  <div>
                    <h4 className="font-semibold mb-3">Thành phần chính:</h4>
                    {Object.entries(product.details?.key_ingredients || {}).map(
                      ([ingredient, desc], index) => (
                        <div key={index} className="mb-3">
                          <strong>{ingredient}:</strong> {desc}
                        </div>
                      )
                    )}
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Tất cả thành phần:</h4>
                      <p>{product.ingredients.join(", ")}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: "4",
                label: "Thông Tin Chi Tiết",
                children: (
                  <div>
                    <p>
                      <strong>Thương hiệu:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Xuất xứ:</strong>{" "}
                      {product.origin || "Chưa cập nhật"}
                    </p>
                    <p>
                      <strong>Hạn sử dụng:</strong> {product.expiration_date}
                    </p>
                    <p>
                      <strong>Thông tin thêm:</strong>{" "}
                      {product.details?.additional_info}
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </Col>

        {/* Phần thông tin bên phải */}
        <Col xs={24} md={12}>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

          <div className="mb-6">
            <div className="text-xl font-semibold text-red-500">
              {moneyFormatter(product.price)}
              {product.discount > 0 && (
                <span className="ml-2 text-gray-400 line-through text-base">
                  {moneyFormatter(product.price * (1 + product.discount / 100))}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <Tag color={product.quantity_available > 0 ? "green" : "red"}>
              {product.quantity_available > 0 ? "Còn Hàng" : "Hết Hàng"}
            </Tag>
            <div className="mt-2">
              <strong>Nhà Cung Cấp:</strong> {product.brand}
            </div>
            <div>
              <strong>Danh mục:</strong> {product.category}
            </div>
            <div>
              <strong>Loại da phù hợp:</strong> {product.skin_type}
            </div>
            <div>
              <strong>Dung tích:</strong> {product.details?.size}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded">
              <Button
                type="text"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="border-0 hover:bg-gray-100 h-8 px-3 text-xl"
              >
                -
              </Button>
              <InputNumber
                min={1}
                max={product.quantity_available}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                controls={false}
                className="w-12 h-8 border-0 text-center [&_.ant-input-number-input]:text-center text-lg "
                variant={false}
              />
              <Button
                type="text"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(product.quantity_available, prev + 1)
                  )
                }
                className="border-0 hover:bg-gray-100 h-8 px-3 text-xl  "
              >
                +
              </Button>
            </div>
            <Button className="bg-[#CC857F] h-8" style={{ height: "40px" }}>
              THÊM VÀO GIỎ HÀNG
            </Button>
            <Button icon={<HeartOutlined />} className="h-8 text-[#CC857F]" />
          </div>

          <Button
            block
            className="mb-4 border-none bg-gradient-to-r from-[#E8A0AE] to-[#EAD8FC] text-white"
            style={{ width: "308px", height: "40px" }}
          >
            MUA NGAY
          </Button>

          <div className="flex items-center gap-2 mb-6">
            <span>Share:</span>
          </div>

          <Card title="Giao Hàng & Trả Hàng" className="mt-6">
            <p>
              Miễn phí đổi trả trong vòng 15 ngày kể từ ngày nhận hàng. Sản phẩm
              được đổi trả phải giữ nguyên tem mác, chưa qua sử dụng.
            </p>
          </Card>

          <Card title="Chính Sách Đổi Trả" className="mt-6">
            <ul className="list-disc pl-4">
              <li>Đổi trả miễn phí trong 15 ngày</li>
              <li>Có thể đổi trả tại cửa hàng hoặc qua đường bưu điện</li>
              <li>Hoàn tiền trong vòng 24h sau khi nhận được hàng trả</li>
              <li>Hỗ trợ đổi trả 24/7</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
