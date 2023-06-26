// src/components/SubscriptionsReferences.js
import React, { useState, useEffect } from 'react';

const SubscriptionReferences = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`);
      }
  
      const data = await response.json();
      setSubscriptions(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSubscriptions([]);
    }
  };
  
  const fetchAllData = () => {
    fetchData('http://localhost:5000/subscriptions');
  };
  
  const fetchFilteredData = () => {
    fetchData('http://localhost:5000/filtered-subscriptions');
  };
  

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="container">
    <h1>Références des souscriptions</h1>
    <button className="btn btn-primary" onClick={fetchAllData}>Afficher toutes les données</button>
    <button className="btn btn-success" onClick={fetchFilteredData}>Afficher les données filtrées</button>
    {error && <div className="alert alert-danger">Erreur: {error}</div>}
    {subscriptions.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type d'abonnement</th>
            <th>Référence de contrat</th>
            <th>Durée</th>
            <th>Date de début</th>
            <th>Actif</th>
            <th>Méthode de paiement</th>
            <th>Annulé</th>
            <th>Statut actuel</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={index}>
              <td>{subscription.SubscriptionType?.name}</td>
              <td>{subscription.contract_reference}</td>
              <td>{subscription.duration} mois</td>
              <td>{new Date(subscription.start_date).toLocaleDateString()}</td>
              <td>{subscription.active ? 'Oui' : 'Non'}</td>
              <td>{subscription.payment_method}</td>
              <td>{subscription.canceled ? 'Oui' : 'Non'}</td>
              <td>{subscription.current_status}</td>
              <td>{new Date(subscription.ended_on).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="alert alert-info">Pas de souscriptions disponibles.</div>
    )}
  </div>
  );
};

export default SubscriptionReferences;
