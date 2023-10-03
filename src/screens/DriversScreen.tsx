import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-reanimated-table';
import {connect} from 'react-redux';
import {RootState} from '../store';
import {ThunkDispatch} from 'redux-thunk';
import {
  next as driversNext,
  refresh as driversRefrest,
} from '../store/drivers/actions';
import {State as DriversState} from '../store/drivers/reducers';
import {Error} from '../components/Error';
import {Loader} from '../components/Loader';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const TABLE_HEAD = ['Races', 'Name', 'Date of birth', 'ID', 'Nationality'];

type StateProps = {
  drivers: DriversState;
};

type DispatchProps = {
  refresh: () => void;
  next: (offset: number) => void;
};

export type DriversScreenProps = StateProps &
  DispatchProps & {
    goToDriver: (id: string) => void;
  };

const DriversScreen = ({
  drivers,
  refresh,
  next,
  goToDriver,
}: DriversScreenProps) => {
  useEffect(() => {
    refresh();
  }, [refresh]);

  const busyRef = useRef(false);

  const onMomentumScrollEnd = useCallback(() => {
    console.log('onMomentumScrollEnd');
    if (busyRef.current) {
      return;
    }
    busyRef.current = true;
    const offset = drivers?.success ? drivers.right.length : 0;
    next(offset);
    busyRef.current = false;
  }, [drivers, next]);

  if (!drivers) {
    return <Loader />;
  }

  if (!drivers.success) {
    return <Error error={drivers.left} />;
  }

  return (
    <ScrollView horizontal>
      <Table>
        <FlatList
          contentContainerStyle={styles.scroll}
          ListHeaderComponent={
            <Row
              data={TABLE_HEAD}
              style={styles.head}
              textStyle={styles.text}
            />
          }
          data={drivers.right}
          renderItem={({item: _, index}) => (
            <TableWrapper
              key={index}
              style={styles.item}
              borderStyle={styles.table}>
              <Cell
                data={
                  <TouchableOpacity onPress={() => goToDriver(_.driverId)}>
                    <Text style={styles.car}> 🏎️</Text>
                  </TouchableOpacity>
                }
                textStyle={styles.text}
              />
              <Cell
                data={
                  <TouchableOpacity onPress={() => goToDriver(_.driverId)}>
                    <Text>
                      {_.givenName} {_.familyName}
                    </Text>
                  </TouchableOpacity>
                }
                textStyle={styles.text}
              />
              <Cell data={_.dateOfBirth} textStyle={styles.text} />
              <Cell data={_.driverId} textStyle={styles.text} />
              <Cell data={_.nationality} textStyle={styles.text} />
            </TableWrapper>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={onMomentumScrollEnd}
        />
      </Table>
    </ScrollView>
  );
};

const mapState = (states: RootState): StateProps => ({
  drivers: states.drivers,
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
  refresh: async () => {
    await dispatch(driversRefrest());
  },
  next: async (offset: number) => {
    await dispatch(driversNext(offset));
  },
});

const connector = connect(mapState, mapDispatch);

export default connector(DriversScreen);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {margin: 6},
  car: {fontSize: 30},
  table: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  item: {flexDirection: 'row', width: 700},
});
