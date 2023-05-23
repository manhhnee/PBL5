import classNames from 'classnames/bind';
import styles from './Introduce.module.scss';

const cx = classNames.bind(styles);

function Introduce() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>Giới thiệu 2&M</header>
      <div className={cx('container')}>
        2H&M là một cửa hàng bán sách trực tuyến được thành lập để đáp ứng nhu cầu đọc sách của độc giả trên toàn thế
        giới. Với mục tiêu mang đến cho khách hàng trải nghiệm mua sắm sách dễ dàng và tiện lợi, 2H&M cung cấp một bộ
        sưu tập đa dạng các thể loại sách từ văn học, khoa học, kinh doanh, self-help đến sách thiếu nhi và giáo trình.
        <br />
        <br />
        Dưới đây là những điểm nổi bật về cửa hàng 2H&M:
        <br />
        <br />
        1. Sự đa dạng về sách: 2H&M cung cấp một loạt các sách từ các nhà xuất bản hàng đầu và tác giả nổi tiếng trên
        toàn thế giới. Khách hàng có thể dễ dàng tìm thấy các tựa sách mới nhất, các bộ truyện nổi tiếng, sách bán chạy
        và những tác phẩm kinh điển.
        <br /> <br />
        2. Giao diện dễ sử dụng: Cửa hàng trực tuyến 2H&M có giao diện thân thiện và dễ sử dụng, giúp khách hàng tìm
        kiếm và đặt hàng một cách thuận tiện. Các danh mục sách được sắp xếp rõ ràng và công cụ tìm kiếm giúp khách hàng
        dễ dàng tìm thấy những cuốn sách mình quan tâm. <br />
        <br />
        3. Chất lượng và độ tin cậy: 2H&M cam kết cung cấp sách chất lượng cao và đáng tin cậy. Các sách được bảo quản
        cẩn thận và đảm bảo không bị hư hỏng trong quá trình giao hàng. <br />
        <br />
        4. Tính năng phản hồi và đánh giá: Khách hàng có thể chia sẻ ý kiến và đánh giá về sách mà họ đã mua từ 2H&M.
        Điều này giúp những khách hàng khác có thể tham khảo và đưa ra quyết định mua sách dựa trên các đánh giá và nhận
        xét. <br />
        <br />
        5. Giao hàng toàn cầu: 2H&M cung cấp dịch vụ giao hàng toàn cầu, cho phép khách hàng trên khắp thế giới đặt hàng
        và nhận sách tại địa chỉ mong muốn.
      </div>
    </div>
  );
}

export default Introduce;
