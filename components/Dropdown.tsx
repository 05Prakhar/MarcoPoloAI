import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}
      >
        <Text style={styles.buttonText}>
          {(selected && selected.label) || label}
        </Text>
        <Ionicons style={styles.icon} name="chevron-down" />
      </TouchableOpacity>
      {renderDropdown()}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    borderRadius: 15,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  overlay: {
    width: '90%',
    height: 'auto',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: '75%',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;
