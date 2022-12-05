import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import styled from 'styled-components';
import apis from '../../shared/apis';
import { useQuery } from '@tanstack/react-query';

const GoogleMap = (props) => {
  const [selectedElement, setSelectedElement] = useState(true);
  const [activeMarker, setActiveMarker] = useState();
  const mapStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
  };

  // 모드링크 연동 설비 위치 호출 api
  const getLocation = async () => {
    try {
      const res = await apis.getLocation();
      return res;
    } catch (err) {
      console.log('구글맵 설비 위치 호출에 실패했습니다.');
    }
  };

  // 모드링크 연동 설비 위치 호출 쿼리
  const { data: getLocationQuery } = useQuery(
    ['loadLocationQuery'],
    getLocation,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.error('구글맵 설비 위치 호출에 실패했습니다.');
      },
    }
  );

  return (
    <Wrap>
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 37.4023124, lng: 127.8122233 }}
      >
        {getLocationQuery.data.result.map((place, i) => (
          <Marker
            key={i}
            position={{ lat: place.latitude, lng: place.longitude }}
            onClick={(props, marker) => {
              setActiveMarker(marker);
              setSelectedElement(place);
            }}
          />
        ))}

        <InfoWindow
          visible={true}
          marker={activeMarker}
          onCloseClick={() => {
            setSelectedElement(null);
          }}
        >
          <Content>
            <div className="company">{selectedElement.customerCorp}</div>
            <div className="content">{selectedElement.companyAddress}</div>
            <div className="model">
              {selectedElement.assignedName} ({selectedElement.model})
            </div>
          </Content>
        </InfoWindow>
      </Map>
    </Wrap>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDQuy4QWYWQX_WvvT0JTyHYFoccEPtsvxM',
})(GoogleMap);

const Wrap = styled.div`
  .gm-style .gm-style-iw {
    padding: 1.6rem !important;
    border: 1px solid #007bff !important;
    border-radius: 0px !important;
  }
  .gm-style-iw-d {
    overflow: hidden !important;
  }
`;

const Content = styled.div`
  padding: 0.5rem;
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
  .company {
    font-family: 'Noto Sans KR', sans-serif;
    color: #323232;
    font-weight: 700;
  }
  .content {
    font-family: 'Noto Sans KR', sans-serif;
    color: #323232;
  }
  .model {
    font-family: 'Noto Sans KR', sans-serif;
    color: blue;
  }
`;
