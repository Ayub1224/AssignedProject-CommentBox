import React from "react";

export interface File {
   timeStamp: number;
   userName: string;
   comment: string;
   file: React.SetStateAction<File[]>

}
export interface props {
   open: boolean;
   userName: string;
   sNumber: number;
   onClose: () => {};
   isOPen: React.SetStateAction<boolean>
   setREplyData: React.Dispatch<React.SetStateAction<never[]>>
}

export interface Api {
   id: number;
   image: URL;
}
export interface Comdisp {
   data: any;
   dataSend: File[];
   setData: React.Dispatch<React.SetStateAction<File[]>>;
   
}

export interface data {
   childId: number;
   parentId: number;
   reply: string;
   userName: string;
}