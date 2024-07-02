import { Input } from "antd";
import Search from "antd/es/input/Search";

import { Controller, useFormContext } from "react-hook-form";
import type { SearchProps } from "antd/es/input/Search";
import { ReactNode } from "react";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  required?: boolean;
  setQueryParma: any;
};

const MainSearch = ({
  type,
  name,
  label,
  required = true,
  setQueryParma,
}: TInputProps) => {
  const onSearch:any = (e:any) => {
      const value = e.target.value
    const searchData: any = {};
    if (value) {
      searchData.searchTerm = value;
    }
    setQueryParma(searchData);
  };

  return (
    <>
      <Search
        allowClear
        style={{}}
        placeholder="Search a product"
        //onSearch={onSearch}
        onChange={onSearch}
        enterButton
      />
    </>
  );
};

export default MainSearch;
