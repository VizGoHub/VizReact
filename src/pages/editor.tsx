import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Layout, Typography, Divider, Select, InputNumber, Switch, Row, Col } from 'antd';
import ChartView from "@/components/ChartView";
import MonacoEditor from '@monaco-editor/react';
import * as api from "@/services/api";
import { API } from "../../typings";
import { message } from 'antd';
const { Content, Sider } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
import { useParams } from 'umi';

export default function ChartEditorPage() {
    const [chart, setChart] = useState<API.TChart>({} as API.TChart);
    const [chartData, setChartData] = useState<API.TChartData>({} as API.TChartData);
    const [code, setCode] = useState<string>("// @ts-nocheck \n");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    let chartId = 0;
    if (id !== undefined) {
        const editorId = parseInt(id, 10);
        if (!isNaN(editorId)) {
            chartId = editorId;
        }
    }

    const loadData = useCallback(async (chartID: number) => {
        try {
            const result = await api.ChartData(chartID);
            console.log(result);
            if (result && result.code === 0) {
                setChartData(result.data)
                const loadedChart = result.data.chart;
                setChart(loadedChart);
                setCode(loadedChart.chart_code || "// @ts-nocheck \n");
                setIsLoaded(true);
            }
        } catch (error) {
            console.error('Error loading chart data:', error);
        }
    }, []);

    useEffect(() => {
        if (chartId !== 0) {
            loadData(chartId);
        }
    }, [loadData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChart(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setChart(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberChange = (value: number | null, name: string) => {
        setChart(prev => ({
            ...prev,
            [name]: value ?? 0,
        }));
    };

    const handleEditorChange = useCallback((value: string | undefined) => {
        setCode(value || '');
        setChart(prev => ({
            ...prev,
            chart_code: value || '',
        }));
    }, []);

    const handleSubmit = async () => {
        try {
            const result = await api.UpdateChart({ data: chart });
            if (result && result.code === 0) {
                message.success('Chart updated successfully');
                console.log('Chart updated successfully');
            } else {
                message.error('Failed to update chart: ' + result.message);
                console.error('Failed to update chart:', result.message);
            }
        } catch (error) {
            message.error('Error updating chart');
            console.error('Error updating chart:', error);
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width="20%" style={{background: '#fff', padding: '20px', overflowY: 'auto'}}>
                    <Title level={3}>Chart Editor</Title>
                    <Form layout="vertical">
                        <Row>
                            <Col>
                                <Form.Item label="data.chart.chart_name->string" style={{marginBottom: '8px'}}>
                                    <Input
                                        name="chart_name"
                                        value={chart.chart_name || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <Form.Item label="data.chart.chart_type->string" style={{marginBottom: '8px'}}>
                                    <Select
                                        // @ts-ignore
                                        name="chart_type"
                                        value={chart.chart_type || ''}
                                        onChange={(value) => handleSelectChange(value, 'chart_type')}
                                        style={{width: '100%'}}
                                    >
                                        <Option value="bar">bar</Option>
                                        <Option value="line">line</Option>
                                        <Option value="pie">pie</Option>
                                        <Option value="treemap">treemap</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Item label="data.chart.labels->string" style={{marginBottom: '8px'}}>
                                    <Input
                                        name="labels"
                                        value={chart.labels || ''}
                                        onChange={handleInputChange}
                                        style={{width: '100%'}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Item label="data.chart.data_source_id->int" style={{marginBottom: '8px'}}>
                                    <InputNumber
                                        name="data_source_id"
                                        value={chart.data_source_id || 0}
                                        onChange={(value) => handleNumberChange(value, 'data_source_id')}
                                        style={{width: '100%'}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Item label="data.chart.query_sql->string" style={{marginBottom: '8px'}}>
                                    <TextArea
                                        name="query_sql"
                                        value={chart.query_sql || ''}
                                        onChange={handleInputChange}
                                        rows={2}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Item label="data.chart.sort->int" style={{marginBottom: '8px'}}>
                                    <InputNumber
                                        name="sort"
                                        value={chart.sort || 0}
                                        onChange={(value) => handleNumberChange(value, 'sort')}
                                        style={{width: '100%'}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={{marginBottom: '8px'}}>
                                    <Switch
                                        checked={chart.status === 1}
                                        onChange={(checked) => handleNumberChange(checked ? 1 : 0, 'status')}
                                        checkedChildren="Enable"
                                        unCheckedChildren="Disable"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={{marginBottom: '8px'}}>
                                    <Button type="primary" onClick={handleSubmit}
                                            style={{width: '100%', marginTop: '20px'}}>
                                        Apply
                                    </Button>
                                    <Divider/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
            </Sider>

            <Content style={{padding: '20px', background: '#fff', flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Title level={4}>TSX Code Editor</Title>
                <div style={{
                    width: '100%',
                    height: '600px',
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    background: '#fff'
                }}>
                    <MonacoEditor
                        height="calc(100% - 60px)"
                        language="typescript"
                        value={code}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        options={{
                            selectOnLineNumbers: true,
                            automaticLayout: true,
                            minimap: {enabled: false},
                        }}
                    />
                </div>
            </Content>

            <Content style={{padding: '20px', background: '#f0f2f5', flex: 1, overflowY: 'auto'}}>
            <Title level={4}>Rendered Output</Title>
                {isLoaded && code && (
                    <div style={{
                        width: '100%',
                        height: '600px',
                        padding: '20px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '8px',
                        background: '#fff'
                    }}>
                        <ChartView chartID={chartId} scripts={code} data={chartData}/>
                    </div>
                )}
            </Content>
        </Layout>
    );
}
