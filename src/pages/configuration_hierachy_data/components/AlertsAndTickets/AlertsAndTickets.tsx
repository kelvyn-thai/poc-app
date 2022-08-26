import { Button, Card, Col, Row, Statistic } from "antd";
import {
  useQueryAlertsAndTicketsData,
  useSelectedCountry,
} from "pages/hierachy_map";
import React from "react";
import { useAlertsAndTicketsStore } from "./AlertsAndTickets.zustand";
import ModalOperation from "./AlertsAndTickets.Modal";

const AlertsAndTickets = () => {
  const {
    country: { country },
  } = useSelectedCountry();
  const {
    alertsFormatted,
    ticketsFormatted,
    alertsDisplayName,
    ticketsDisplayName,
    resource,
  } = useQueryAlertsAndTicketsData(country);
  const { setModalOperation } = useAlertsAndTicketsStore();
  return (
    <>
      <Button
        type="primary"
        className="mb-3"
        onClick={() =>
          setModalOperation({ isVisible: true, resource, isCreate: !!resource })
        }
      >
        Operation
      </Button>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title={alertsDisplayName}
              className="truncate"
              value={alertsFormatted}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title={ticketsDisplayName}
              className="truncate"
              value={ticketsFormatted}
            />
          </Card>
        </Col>
      </Row>
      <ModalOperation />
    </>
  );
};

export default React.memo(AlertsAndTickets);
