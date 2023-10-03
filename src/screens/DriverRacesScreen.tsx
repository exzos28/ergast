import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../store';
import {ThunkDispatch} from 'redux-thunk';
import {Error} from '../components/Error';
import {Loader} from '../components/Loader';
import {DriverId} from '../store/drivers/types';
import {Either} from '../core';
import {Race} from '../store/races/types';
import {load as racesLoad} from '../store/races/actions';
import {Cell, Row, Table, TableWrapper} from 'react-native-reanimated-table';
import {ScrollView} from 'react-native-gesture-handler';

const TABLE_HEAD = [
  'Race name',
  'Location',
  'Date',
  'Position',
  'Points',
  'Status',
];

type StateProps = {
  driver: Either<Race[], unknown>;
};

type DispatchProps = {
  load: (id: DriverId) => void;
};

type PublicProps = {
  id: DriverId;
};

export type DriverRacesScreenProps = StateProps &
  DispatchProps &
  PublicProps & {};

const DriverRacesScreen = ({load, driver, id}: DriverRacesScreenProps) => {
  useEffect(() => {
    load(id);
  }, [id, load]);

  if (!driver) {
    return <Loader />;
  }

  if (!driver.success) {
    return <Error error={driver.left} />;
  }

  return (
    <ScrollView>
      <ScrollView horizontal>
        <Table style={styles.table}>
          <Row data={TABLE_HEAD} style={styles.head} textStyle={styles.text} />
          {driver.right.map((_, i) => (
            <TableWrapper
              key={i}
              style={styles.row}
              borderStyle={styles.wrapper}>
              <Cell
                data={`${_.raceName} \n(season: ${_.season} / round: ${_.round})`}
                textStyle={styles.text}
              />
              <Cell
                data={`${_.Circuit.circuitName} (${_.Circuit.Location.country})`}
                textStyle={styles.text}
              />
              <Cell data={_.date} textStyle={styles.text} />
              <Cell
                data={`${_.Results[0].position} (${_.Results[0].positionText})`}
                textStyle={styles.text}
              />
              <Cell data={_.Results[0].points} textStyle={styles.text} />
              <Cell data={_.Results[0].status} textStyle={styles.text} />
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
    </ScrollView>
  );
};

const mapState = (states: RootState, props: PublicProps): StateProps => ({
  driver: states.races[props.id],
});

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
  load: async (id: DriverId) => {
    await dispatch(racesLoad(id));
  },
});

const connector = connect(mapState, mapDispatch);

export default connector(DriverRacesScreen);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  table: {
    width: 600,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  row: {flexDirection: 'row'},
});
