import axios from 'axios';
import Trips from '../services/Trips';
import test_helper from './test_helper';

jest.mock('axios');

describe('Trips', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        test('should fetch all Trips successfully', async () => {
            const mockResponse = test_helper.initialTrips;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Trips.getAll();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip`);
            expect(result.data).toEqual(mockResponse.data);
        });

        test('should handle errors when fetching all trips', async () => {
            const errorMessage = 'Failed to fetch trips.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAll()).rejects.toThrow(errorMessage);
        });

    });
    describe('getPaginatedTrips', () => {
        test('should fetch page of trips, paginated in backend, frontend acts as getAll', async () => {
            const mockResponse = test_helper.initialTrips;
            const pageNumber = 10;
            const pageSize = 10;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Trips.getPaginatedTrips(10,10);

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/getPaginatedTrips?pagenumber=${pageNumber}&pagesize=${pageSize}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching all trips', async () => {
            const errorMessage = 'Failed to fetch trips.';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getPaginatedTrips(10,10)).rejects.toThrow(errorMessage);
        });
    });
    describe('getTopTrips', () => {
        test('should fetch top trops, sorted in backend, frontend acts as getAll', async () => {
            const mockResponse = test_helper.initialTrips;
            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await Trips.getTopTrips();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/toptrips`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching top trips', async () => {
            const errorMessage = 'Failed to fetch Top Trips';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getTopTrips()).rejects.toThrow(errorMessage);
        });
    });

    describe('getAverageDistaceByStation', () => {
        test('should fetch average distance of a trips by station id, counted in backend, returns number as meters', async () => {
            const mockResponse = test_helper.initialTrips[0].coveredDistance;
            axios.get.mockResolvedValueOnce(mockResponse);
            const stationId = 2
            const result = await Trips.getAverageDistanceByStation(stationId);
            
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/getaveragedistancebystation?stationid=${stationId}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching average distance', async () => {
            const errorMessage = 'Failed to fetch average distance';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAverageDistanceByStation(55)).rejects.toThrow(errorMessage);
        });
    });

    describe('getAverageDistaceByDStationadnRStation', () => {
        test('should fetch average distance of a trips by station id, counted in backend, returns number as meters', async () => {
            const mockResponse = test_helper.initialTrips[0].coveredDistance;
            axios.get.mockResolvedValueOnce(mockResponse);
            const stationId1 = 2;
            const stationId2 = 3;
            const result = await Trips.getAverageDistanceByDStationandRStation(stationId1, stationId2);
            
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/getaveragedistancebystations?dsid=${stationId1}&rsid=${stationId2}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching average distance', async () => {
            const errorMessage = 'Failed to fetch average distance';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAverageDistanceByDStationandRStation(55,66)).rejects.toThrow(errorMessage);
        });
    });

    describe('getAverageDurationByStation', () => {
        test('should fetch average trip duration of a trips by station id, counted in backend, returns number as seconds', async () => {
            const mockResponse = test_helper.initialTrips[0].duration;
            axios.get.mockResolvedValueOnce(mockResponse);
            const stationId = 2
            const result = await Trips.getAverageDurationByStation(stationId);
            
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/getaveragedurationbystation?stationid=${stationId}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching average duration', async () => {
            const errorMessage = 'Failed to fetch average duration';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAverageDurationByStation(55)).rejects.toThrow(errorMessage);
        });
    });

    describe('getAverageDurationByDStationadnRStation', () => {
        test('should fetch average distance of a trips by station id, counted in backend, returns number as meters', async () => {
            const mockResponse = test_helper.initialTrips[0].duration;
            axios.get.mockResolvedValueOnce(mockResponse);
            const stationId1 = 2;
            const stationId2 = 3;
            const result = await Trips.getAverageDurationByDStationandRStation(stationId1, stationId2);
            
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/getaveragedurationbystations?dsid=${stationId1}&rsid=${stationId2}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching average duration', async () => {
            const errorMessage = 'Failed to fetch average duration';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAverageDistanceByDStationandRStation(55,66)).rejects.toThrow(errorMessage);
        });
    });

    describe('getTripCountPerMonthStation', () => {
        test('should fetch count of a trips by station id, counted in backend, returns int', async () => {
            const mockResponse = 1;
            axios.get.mockResolvedValueOnce(mockResponse);
            const stationId1 = 2;
            const stationId2 = 3;
            const month = 6;
            const year = 2021;
            const result = await Trips.getTripCountPerMonthStation(stationId1, stationId2, month);
            
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip/gettripcountpermonthstation?dsid=${stationId1}&rsid=${stationId2}&month=${month}&year=${year}`);
            expect(result.data).toEqual(mockResponse.data);
        });
        test('should handle errors when fetching trip count', async () => {
            const errorMessage = 'Failed to fetch trip count';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.getAverageDistanceByDStationandRStation(55,66)).rejects.toThrow(errorMessage);
        });
    });

    describe('putTrip', () => {
        test('should successfully update an existing Trip', async () => {
            const tripData = {
                tripId:11,
                departureTime:"2021-06-17T18.40.00.0000000",
                returnTime:"2021-06-17T19.00.00.0000000",
                departureStationId:2,
                returnStationId: 3,
                coveredDistance:1000,
                duration: 600
            };
            const mockResponse = { data: tripData };
            axios.put.mockResolvedValueOnce(mockResponse);

            const result = await Trips.putTrip(tripData);

            expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip`, tripData);
            expect(result).toEqual(mockResponse);
        });

        test('should handle errors when updating an existing trip', async () => {
            const tripData = {                 
                tripId:11,
                departureTime:"2021-06-17T18.40.00.0000000",
                returnTime:"2021-06-17T19.00.00.0000000",
                departureStationId:2
            };
            const errorMessage = 'Failed to update the trip.';
            axios.put.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.putTrip(tripData)).rejects.toThrow(errorMessage);
        });
    });

    describe('postTrip', () => {
        test('should successfully create a new trip', async () => {
            const tripData = {
                departureTime:"2021-06-17T18.40.00.0000000",
                returnTime:"2021-06-17T19.00.00.0000000",
                departureStationId:2,
                returnStationId: 1,
                coveredDistance:11000,
                duration: 6000
            };
            const mockResponse = { data: { tripId:14, ...tripData } };
            axios.post.mockResolvedValueOnce(mockResponse);

            const result = await Trips.postTrip(tripData);

            expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URI}/trip`, tripData);
            expect(result).toEqual(mockResponse);
        });

        test('should handle errors when creating a new Trip', async () => {
            const tripData = { tripId: '7777' };
            const errorMessage = 'Failed to create the station.';
            axios.post.mockRejectedValueOnce(new Error(errorMessage));

            await expect(Trips.postTrip(tripData)).rejects.toThrow(errorMessage);
        });
    });

});