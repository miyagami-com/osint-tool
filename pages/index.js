import {Collapse, Descriptions, Tag, Layout, Menu, Typography} from 'antd'
import React, {useEffect, useRef, useState} from "react";
import mapboxgl from '!mapbox-gl';
import Head from 'next/head'
import {CheckCircleFilled, CheckCircleTwoTone, CloseCircleFilled, CloseCircleTwoTone} from "@ant-design/icons";

const {Panel} = Collapse;
const {Sider, Content} = Layout;
const {SubMenu} = Menu;
const {Title} = Typography;

mapboxgl.accessToken = 'pk.eyJ1IjoibWl5YWdhbWkiLCJhIjoiY2t0enk0NjhzMXprdTJ3bXJ3YmNueGFubyJ9.a351W9fuzkJQL2_oCatHkw';

export default function Home() {
    const [cookieData, setCookieData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [localeData, setLocaleData] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState();
    const [lat, setLat] = useState();

    useEffect(() => {
        fetchCookieData();
        fetchUserData();
        fetchLocaleData();
    }, [])

    useEffect(() => {
        console.log(localeData)
    }, [localeData])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        if (lat && lng) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: 13
            });
            // const marker = new mapboxgl.Marker()
            //     .setLngLat([lng, lat])
            //     .addTo(map);
        }
    }, [lng, lat]);

    function fetchCookieData() {
        let archive = [], // Notice change here
            keys = Object.keys(localStorage),
            i = keys.length;
        while (i--) {
            const value = localStorage.getItem(keys[i])
            let type = 'String'
            if (value === 'true' || value === 'false') {
                type = "Boolean";
            }
            try {
                const temp = JSON.parse(value)
                if (temp && typeof temp === "object") {
                    type = "JSON"
                }
            } catch (e) {
            }
            archive[i] = {title: keys[i], value, type}
        }
        setCookieData(archive);
    }

    function fetchUserData() {
        setUserData([
            {
                title: "Cookies",
                value: navigator.cookieEnabled
            },
            {
                title: "App Code Name",
                value: navigator.appCodeName
            },
            {
                title: "App Name",
                value: navigator.appName
            },
            {
                title: "App Version ",
                value: navigator.appVersion
            },
            {
                title: "Language",
                value: navigator.language
            },
            {
                title: "Platform",
                value: navigator.platform
            },
            {
                title: "Product",
                value: navigator.product
            },
            {
                title: "User Agent",
                value: navigator.userAgent
            },
            {
                title: "Web Driver",
                value: navigator.webdriver
            },
        ])
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        } else {
            setUserData([...userData, {
                title: "Geolocation",
                value: "Not supported by this browser."
            }])
        }
    }

    async function fetchLocaleData() {
        const url = `/api`;
        try {
            let response = await fetch(url, {
                method: 'GET',
            });
            let data = await response.json();
            setLocaleData(data)
            setLng(Number(data.longitude))
            setLat(Number(data.latitude))
        } catch (e) {
            console.log(e)
        }
    }

    function setPosition(position) {
        setUserData([...userData,
            {
                title: "Latitude",
                value: position.coords.latitude,
            },
            {
                title: "Longitude",
                value: position.coords.longitude,
            },
        ])
    }

    return (
        <Layout className="app">
            <Head>
                <title>{localeData.ip}</title>
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet'/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Sider collapsible>
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {userData?.map((item) => (
                        <SubMenu key={item.title} icon={item.icon} title={item.title}>
                            <Menu.Item disabled key={String(item.value)}>{String(item.value)}</Menu.Item>
                        </SubMenu>
                    ))}
                    <Menu.Item
                        key="is_anonymous"
                        icon={localeData?.threat?.is_anonymous ?
                            <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                            <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Anonymous
                    </Menu.Item>
                    <Menu.Item key="is_bogon"
                               icon={localeData?.threat?.is_bogon ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Bogon
                    </Menu.Item>
                    <Menu.Item key="is_abuser"
                               icon={localeData?.threat?.is_known_abuser ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Abuser
                    </Menu.Item>
                    <Menu.Item key="is_attacker"
                               icon={localeData?.threat?.is_known_attacker ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Attacker
                    </Menu.Item>
                    <Menu.Item key="is_proxy"
                               icon={localeData?.threat?.is_proxy ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Proxy
                    </Menu.Item>
                    <Menu.Item key="is_threat"
                               icon={localeData?.threat?.is_threat ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >
                        Threat
                    </Menu.Item>
                    <Menu.Item key="is_tor"
                               icon={localeData?.threat?.is_tor ?
                                   <CheckCircleFilled style={{color: "#52c41a", fontSize: 16}}/> :
                                   <CloseCircleFilled style={{color: "red", fontSize: 16}}/>}
                    >Tor
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Title style={{marginTop: 20, marginBottom: 20}} level={4}>
                        User Data
                    </Title>
                    <Descriptions
                        bordered
                    >
                        <Descriptions.Item label="IP Address">{localeData?.ip}</Descriptions.Item>
                        <Descriptions.Item label="ISP Provider">{localeData?.asn?.name}</Descriptions.Item>
                        <Descriptions.Item
                            label="Timezone">{localeData?.time_zone?.offset} {localeData?.time_zone?.abbr}</Descriptions.Item>
                        <Descriptions.Item label="Continent">{localeData?.continent_name}</Descriptions.Item>
                        <Descriptions.Item
                            label="Country">{localeData?.emoji_flag} {localeData?.country_name}</Descriptions.Item>
                        <Descriptions.Item label="Region">{localeData?.region}</Descriptions.Item>
                        <Descriptions.Item label="City">{localeData?.city}</Descriptions.Item>
                        <Descriptions.Item label="Language">{localeData?.languages?.[0]?.name}</Descriptions.Item>
                        <Descriptions.Item label="Currency">{localeData?.currency?.name}</Descriptions.Item>

                        <Descriptions.Item label="Location" style={{padding: 0}}>
                            <div style={{position: "relative"}}>
                                <div className="sidebar">
                                    Longitude: {lng} | Latitude: {lat}
                                </div>
                                <div ref={mapContainer} className="map-container"/>
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                    <Title style={{marginTop: 20, marginBottom: 20}} level={4}>Local Storage Data</Title>
                    <Collapse accordion>
                        {cookieData && cookieData.map((item) => (
                            <Panel header={item.title} key={item.title} extra={<Tag>{item.type}</Tag>}>
                                {(item.type === "String" || item.type === "Boolean") &&
                                <p>{item.value}</p>
                                }
                                {(item.type === "JSON") && (
                                    <Descriptions bordered>
                                        {Object.entries(JSON.parse(item.value)).map(([key, value]) =>
                                            Array.isArray(value) ?
                                                value.map((subitem) =>
                                                    <Descriptions.Item
                                                        label={subitem.Name}>{subitem.Value}</Descriptions.Item>)
                                                :
                                                <Descriptions.Item label={key}>{value}</Descriptions.Item>
                                        )}
                                    </Descriptions>
                                )}
                            </Panel>
                        ))}
                    </Collapse>
                </Content>
            </Layout>
        </Layout>
    )
}
