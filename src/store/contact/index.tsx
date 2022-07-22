import {RawContact} from '@/types';
import {useSelector, batch} from 'react-redux';
import {createDynamicReducer} from '@/utils/createDynamicReducers';
import {store} from '@/store';

// Tao ra mot mang rong voi kieu phan tu la RawContact
const initContact = {
  byKey: {
    19282828282: {
      id: '19282828282',
      avatar: '',
      phoneNumberList: ['0931924433', '093838383'],
      value: 'Nguyễn Tiến',
      firstName: 'Nam',
      company: 'Base',
      birthdayList: ['11/2/22'],
      emailList: ['email@gmal.com', 'email2@gmail.com'],
      addressList: ['So 2 ngo 198'],
    },
  },

  query: {
    all: ['19282828282'],
  },
};

const {setStore, reducer, sync, useByKey, setQueries} =
  createDynamicReducer<RawContact>('contacts', 'id', initContact);

export const setContactStore = setStore;
export const contactReducer = reducer;
export const useContactByKey = useByKey;
export const syncContact = sync;
export const setContactQueries = setQueries;

export const updateContact = (contacts: RawContact[], id: string) => {
  let query: {[id: string]: string[]} = {};
  let listContact = store.getState()?.contacts?.query['all'] || [];

  for (let contact of contacts) {
    listContact = listContact.concat([contact.id.toString()]);
  }

  batch(() => {
    syncContact(contacts);
    setContactQueries({
      all: [...new Set(listContact)],
      ...query,
    });
  });
};

export const removeContact = (id: string | undefined) => {
  const listContact = store.getState()?.contacts?.query['all'] || [];
  let _contacts: string[] = listContact.filter(_id => _id !== id);

  batch(() => {
    setContactQueries({
      all: _contacts,
    });
  });
};

export const useListContact = () => {
  return useSelector((state: any) =>
    state.contacts.query.all.map((key: string) => {
      return {
        normalizerForSearch: state.contacts.byKey[key].normalizerForSearch,
        key,
        value: state.contacts.byKey[key].value,
      };
    }),
  );
};
