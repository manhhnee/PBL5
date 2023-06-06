import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomSelect.module.scss';

const cx = classNames.bind(styles);

const CustomSelect = ({ data, setId }) => {
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (name, id) => {
    setSelectedOption(name);
    setDropdownOpen(false);
    setId(id);
  };

  const filteredData = data && data.filter((data) => data.Name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={cx('custom-select')}>
      <div className={cx('select-value')} onClick={toggleDropdown}>
        {selectedOption || 'Select an option'}
      </div>
      {dropdownOpen && (
        <div className={cx('option-list')}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cx('search-input')}
            placeholder="Nhập để tìm kiếm ..."
          />
          {filteredData &&
            filteredData.map((data) => (
              <div key={data.id} className={cx('option')} onClick={() => handleOptionClick(data.Name, data.id)}>
                {data.Name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
