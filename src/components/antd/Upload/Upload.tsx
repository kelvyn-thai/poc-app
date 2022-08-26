import { Upload } from "antd";
import React from "react";
import { IUpload } from "./Upload.typings";

const AntdUpload: React.FC<IUpload> = ({ ...rest }) => <Upload {...rest} />;

export default React.memo(AntdUpload);
