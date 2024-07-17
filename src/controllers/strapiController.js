export const CreateData = async (MetricName, newData) => {
  
    const payload = { data: newData };
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}`;
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };
  // UPDATE an entry in a collection
  export const UpdateData = async (MetricName, id, newData) => {
    const payload = { data: newData };
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/${id}`;
    const response = await fetch(URL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    let data = response.json();
    return data;
  };
  // Get a particular entry in a collection
  export const getOneData = async (MetricName, id) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/${id}/?populate=*`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };
  export const getAllData = async (MetricName) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/?populate=*`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        // Authorization: Bearer ${jwt}
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };
  export const getOneTypeBlog = async (MetricName, filter) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/?populate=*&filters[Type][$eq]=${filter}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      cache:"no-cache",
      headers: {
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };
  export const getOneBlog = async (MetricName, filter1,filter2) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/?populate=*&filters[Type][$eq]=${filter1}&filters[Path][$eq]=${filter2}`;
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      cache:"no-cache",
      headers: {
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };
  
  export const DeleteSingleAttribute = async (MetricName, id) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/${id}`;
    const response = await fetch(URL, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        // Authorization: Bearer ${jwt}
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };

  export const getFilteredByTwoRelation = async (MetricName,filterKey1,filterValue1,filterKey2,filterValue2) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/?populate=*&filters[${filterKey1}][id][$eq]=${filterValue1}&filters[${filterKey2}][id][$eq]=${filterValue2}`;
    let jwt;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
      jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
      jwt = "";
    }
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        // Authorization: Bearer ${jwt}
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };

  export const getFilteredByOneRelation = async (MetricName,filterKey1,filterValue1) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/${MetricName}/?populate=*&filters[${filterKey1}][id][$eq]=${filterValue1}`;
    let jwt;
    if (JSON.parse(sessionStorage.getItem("userData"))) {
      jwt = JSON.parse(sessionStorage.getItem("userData")).jwt;
    } else {
      jwt = "";
    }
    const response = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        // Authorization: Bearer ${jwt}
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData?.message || 'Error fetching data');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    let data = response.json();
    return data;
  };