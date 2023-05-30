/* eslint-disable no-undef */
import axios from 'axios';
import TripCounts from '../services/TripCounts';
import test_helper from './test_helper';

jest.mock('axios');

describe('TripCounts', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('should fetch all TripCounts successfully', async () => {
            const mockResponse = test_helper.initialTripCounts;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await TripCounts.getAll();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching all TripCounts', async () => {
            const errorMessage = 'Failed to fetch TripCounts.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getAll()).rejects.toThrow(errorMessage);
        });

    });

    describe('getTripCount', () => {
        test('should fetch the count of trips between two stations successfully', async () => {
            const mockResponse = 10;
            const departureStationId = 2;
            const returnStationId = 3;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await TripCounts.getTripCount(departureStationId, returnStationId);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount/gettripcount?dsid=${departureStationId}&rsid=${returnStationId}`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching the count of trips', async () => {
            const errorMessage = 'Failed to fetch trip count.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getTripCount(2, 3)).rejects.toThrow(errorMessage);
        });
    });

    describe('getPaginatedTripCounts', () => {
        test('should fetch a page of TripCounts, paginated in the backend', async () => {
            const mockResponse = test_helper.initialTripCounts;
            const pageNumber = 10;
            const pageSize = 10;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await TripCounts.getPaginatedTripCounts(pageNumber, pageSize);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount/getpaginatedtripcounts?pagenumber=${pageNumber}&pagesize=${pageSize}`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching paginated TripCounts', async () => {
            const errorMessage = 'Failed to fetch paginated TripCounts.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getPaginatedTripCounts(10, 10)).rejects.toThrow(errorMessage);
        });
    });

    describe('getStationDepartureCount', () => {
        test('should fetch the count of departures for each station', async () => {
            const mockResponse = test_helper.initialTripCounts;
            axios.get.mockResolvedValueOnce(mockResponse);
            const result = await TripCounts.getStationDepartureCount();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount/getstationcount`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching the count of departures', async () => {
            const errorMessage = 'Failed to fetch departure counts.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getStationDepartureCount()).rejects.toThrow(errorMessage);
        });
    });

    describe('getTripCountByDsId', () => {
        test('should fetch the trip count by departure station ID successfully', async () => {
            const mockResponse = test_helper.initialTripCounts[0].count;
            const dsid = 1;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await TripCounts.getTripCountByDsId(dsid);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount/departures?dsid=${dsid}`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching the trip count by departure station ID', async () => {
            const errorMessage = 'Failed to fetch trip count by departure station ID.';
            const dsid = 2;
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getTripCountByDsId(dsid)).rejects.toThrow(errorMessage);
        });
    });

    describe('getTripCountByRsId', () => {
        test('should fetch the trip count by return station ID successfully', async () => {
            const mockResponse = test_helper.initialTripCounts[0].count;
            const rsid = 2;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await TripCounts.getTripCountByRsId(rsid);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/tripcount/returns?rsid=${rsid}`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching the trip count by return station ID', async () => {
            const errorMessage = 'Failed to fetch trip count by return station ID.';
            const rsid = 3;
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(TripCounts.getTripCountByRsId(rsid)).rejects.toThrow(errorMessage);
        });
    });
});