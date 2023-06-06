import classNames from 'classnames/bind';
import styles from './Privacy.module.scss';

const cx = classNames.bind(styles);

function Privacy() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>Chính sách bảo mật của 2&M</header>
      <div className={cx('container')}>
        Chính sách bảo mật của cửa hàng bán sách trực tuyến 2H&M đặt mục tiêu chính là bảo vệ thông tin cá nhân của
        khách hàng và đảm bảo rằng dữ liệu của họ được xử lý và lưu trữ một cách an toàn. Chúng tôi cam kết tuân thủ các
        quy định và luật pháp liên quan đến bảo vệ thông tin cá nhân và nỗ lực để duy trì một môi trường trực tuyến an
        toàn cho khách hàng.
        <br />
        <br /> Khi khách hàng truy cập và sử dụng trang web của chúng tôi, có một số thông tin cá nhân có thể được thu
        thập nhằm cung cấp dịch vụ và cải thiện trải nghiệm mua sắm. Những thông tin này có thể bao gồm tên, địa chỉ, số
        điện thoại, địa chỉ email và thông tin thanh toán. Chúng tôi chỉ thu thập những thông tin cần thiết và có liên
        quan để xử lý đơn hàng và cung cấp dịch vụ cho khách hàng.
        <br />
        <br /> Chúng tôi cam kết bảo mật dữ liệu cá nhân của khách hàng bằng cách áp dụng các biện pháp bảo mật vật lý,
        kỹ thuật và quản lý. Các biện pháp này bao gồm mã hóa dữ liệu, sử dụng công nghệ bảo vệ tường lửa và quản lý
        truy cập. Chúng tôi đảm bảo rằng thông tin cá nhân sẽ không bị mất mát, lạm dụng hoặc truy cập trái phép. <br />
        <br />
        Thông tin cá nhân của khách hàng chỉ được sử dụng để xử lý đơn hàng, giao hàng, cung cấp thông tin liên quan đến
        sản phẩm và dịch vụ, và liên hệ với khách hàng khi cần thiết. Chúng tôi cam kết không tiết lộ hoặc chuyển giao
        thông tin cá nhân cho bất kỳ bên thứ ba nào mà không có sự đồng ý của khách hàng, trừ khi có yêu cầu pháp lý
        hoặc cho mục đích hỗ trợ khách hàng.
        <br />
        <br /> Trang web của chúng tôi có thể sử dụng cookie và công nghệ theo dõi tương tự để thu thập thông tin không
        cá nhân về hoạt động truy cập trang web và cải thiện trải nghiệm của khách hàng. Cookie là các tệp nhỏ được lưu
        trữ trên trình duyệt của khách hàng để nhận dạng và ghi nhớ thông tin. Khách hàng có thể điều chỉnh cài đặt
        trình duyệt để từ chối cookie, nhưng điều này có thể ảnh hưởng đến khả năng truy cập và sử dụng một số tính năng
        trên trang web. <br />
        <br />
        Ngoài ra, trang web của chúng tôi có thể chứa liên kết đến các trang web bên ngoài. Chúng tôi không chịu trách
        nhiệm về chính sách bảo mật hoặc nội dung của các trang web bên ngoài này. Chúng tôi khuyến nghị khách hàng kiểm
        tra chính sách bảo mật của từng trang web khi truy cập vào chúng.
        <br />
        <br /> Chính sách bảo mật của chúng tôi có thể được xem chi tiết trên trang web hoặc trong các điều khoản và
        điều kiện của cửa hàng. Chúng tôi cập nhật và xem xét chính sách này đều đặn để đảm bảo nó phù hợp với các quy
        định và thay đổi liên quan. Nếu có bất kỳ câu hỏi hoặc mối quan ngại nào về chính sách bảo mật, khách hàng có
        thể liên hệ với chúng tôi để được hỗ trợ.
      </div>
    </div>
  );
}

export default Privacy;
