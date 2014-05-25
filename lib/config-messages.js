exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "To use this feature, Caller ID must be enabled for your phone service. You should call your telephone company to check if it's enabled. There may be a cost "},
  { "type": "input_field_select", "field_name": "caller_id", "label": "Use Caller ID", "options": [{ "name": "Yes", "value": true}, { "name": "No", "value": false, "selected": true}], "required": true },
    { "type": "submit", "name": "Save", "rpc_method": "save" },
  ]
};