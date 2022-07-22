//Raw Contact nay la mot phan  tu contact
// Model phai khop vs ben tao moi
// value thay cho lastname
export interface RawContact {
  key?: string;
  id: string;
  avatar: string;
  value: string; // Điệp
  firstName: string; // Hữu
  normalizerForSearch?: string; // firstName + value + slugify(firstName) + slugify(value)  Hữu Điệp huu diep
  company: string;
  phoneNumberList: string[];
  emailList: string[];
  addressList: string[];
  birthdayList: string[];
}

export interface ListContact {
  key: string;
  value: string;
  normalizerForSearch?: string;
}

export interface DetailScreenProps {
  id: string;
}

export interface CreateScreenProps {
  id?: string;
  contact?: RawContact;
}
