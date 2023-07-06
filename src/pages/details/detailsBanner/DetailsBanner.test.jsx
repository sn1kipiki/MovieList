import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DetailsBanner from './DetailsBanner';


jest.mock('../../../hooks/useFetch', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('dayjs', () => () => ({
  format: jest.fn(() => '2021'),
}));
jest.mock('../../../components/videoPopup/VideoPopup', () => jest.fn());

describe('DetailsBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when data is loading', () => {
    useSelector.mockReturnValue({ url: { backdrop: 'http://example.com' } });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DetailsBanner video={null} crew={null} />
        </Provider>
      </BrowserRouter>
    );


    expect(screen.getByTestId('detailsBannerSkeleton')).toBeInTheDocument();
  });

  it('renders banner content when data is loaded', () => {
    useSelector.mockReturnValue({ url: { backdrop: 'http://example.com' } });
    useFetch.mockReturnValue({ data: { name: 'Movie Title', release_date: '2022-01-01' }, loading: false });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DetailsBanner video={null} crew={null} />
        </Provider>
      </BrowserRouter>
    );


    expect(screen.getByText('Movie Title (2021)')).toBeInTheDocument();
    expect(screen.getByText('Release Date: Jan 1, 2022')).toBeInTheDocument();
  });

  it('displays video popup when play button is clicked', () => {
    useSelector.mockReturnValue({ url: { backdrop: 'http://example.com' } });
    useFetch.mockReturnValue({ data: { name: 'Movie Title', release_date: '2022-01-01' }, loading: false });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DetailsBanner video={{ key: 'videoKey' }} crew={null} />
        </Provider>
      </BrowserRouter>
    );


    fireEvent.click(screen.getByText('Watch Trailer'));


    expect(screen.getByTestId('videoPopup')).toBeInTheDocument();
  });
});
