/* eslint-disable no-undef */
import axios from 'axios';
import Stations from '../services/Stations';
import test_helper from './test_helper';

jest.mock('axios');

describe('Stations', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('should fetch all stations successfully', async () => {
            const mockResponse = test_helper.initialStations;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Stations.getAll();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching all stations', async () => {
            const errorMessage = 'Failed to fetch stations.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Stations.getAll()).rejects.toThrow(errorMessage);
        });

    });

    describe('getStation', () => {
        test('should fetch station by id', async () => {
            const id = 1;
            const mockResponse = test_helper.initialStations[0];
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Stations.getStation(id);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station/${id}`);
            expect(result).toEqual(test_helper.initialStations[0]);
        });

        test('should handle errors when fetching a specific station', async () => {
            const stationId = '123';
            const errorMessage = 'Failed to fetch the station.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Stations.getStation(stationId)).rejects.toThrow(errorMessage);
        });

    });
    describe('getStationName', () => {
        test('should fetch station by id', async () => {
            const id = 1;
            const mockResponse = test_helper.initialStations[0].nimi;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Stations.getStationName(id);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station/name${id}`);
            expect(result).toEqual(test_helper.initialStations[0].nimi);
        });

        test('should handle errors when fetching a specific station', async () => {
            const stationId = '123';
            const errorMessage = 'Failed to fetch the station.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Stations.getStation(stationId)).rejects.toThrow(errorMessage);
        });

    });

    describe('postStation', () => {
        test('should successfully create a new station', async () => {
            const stationData = {
                nimi: "asema4",
                namn: "asema4",
                name: "asema4",
                osoite: "asema4osoite",
                x: "25.400",
                y: "60.00"
            };
            const mockResponse = { data: { hslStationId: '4', ...stationData } };
            axios.post.mockResolvedValueOnce(mockResponse);

            const result = await Stations.postStation(stationData);

            expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station`, stationData);
            expect(result).toEqual(mockResponse);
        });

        test('should handle errors when creating a new station', async () => {
            const stationData = { name: 'New Station' };
            const errorMessage = 'Failed to create the station.';
            axios.post.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Stations.postStation(stationData)).rejects.toThrow(errorMessage);
        });
    });

    describe('putStation', () => {
        test('should successfully update an existing station', async () => {
            const stationData = {
                hslStationId: "5",
                nimi: "asema5",
                namn: "asema5",
                name: "asema5",
                osoite: "asema5osoite",
                x: "25.500",
                y: "60.500"
            };
            const mockResponse = { data: stationData };
            axios.put.mockResolvedValueOnce(mockResponse);

            const result = await Stations.putStation(stationData);

            expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station`, stationData);
            expect(result).toEqual(mockResponse);
        });

        test('should handle errors when updating an existing station', async () => {
            const stationData = { id: '123', name: 'Updated Station' };
            const errorMessage = 'Failed to update the station.';
            axios.put.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Stations.putStation(stationData)).rejects.toThrow(errorMessage);
        });
    });

    describe('deleteStation', () => {
        test('should successfully delete a specific station', async () => {
          const stationId = '5';
          const mockResponse = { status: 200 };
          axios.delete.mockResolvedValueOnce(mockResponse);
    
          const result = await Stations.deleteStation(stationId);
    
          expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/station/${stationId}`);
          expect(result).toEqual(mockResponse);
        });
    
        test('should handle errors when deleting a specific station', async () => {
          const stationId = '123';
          const errorMessage = 'Failed to delete the station.';
          axios.delete.mockRejectedValueOnce(new Error(errorMessage));
    
          await expect(Stations.deleteStation(stationId)).rejects.toThrow(errorMessage);
        });
      });

});