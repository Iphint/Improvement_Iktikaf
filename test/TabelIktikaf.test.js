import React from 'react';
import renderer from 'react-test-renderer'
import TabelIktikaf from '../app/components/TabelIktikaf';

const dummyData = {
    21: 150,
    22: 250,
    23: 350,
    24: 450,
    25: 550,
    26: 650,
    27: 750,
    28: 850,
    29: 950,
    30: 1050,
  };

  describe('TabelIktikaf', () => {
    it('renders correctly with dummy data', () => {
       const tree = renderer
         .create(<TabelIktikaf jumlahDoa={dummyData} />)
         .toJSON();
       expect(tree).toMatchSnapshot();
    });
   });