using NCMB;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataFetch : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        NCMBQuery<NCMBObject> query = new NCMBQuery<NCMBObject>("PlayerData");
        query.FindAsync((List<NCMBObject> objList, NCMBException e) =>
        {
            if (e != null)
            {

            }
            else
            {
                foreach(NCMBObject obj in objList)
                {
                    Debug.Log(
                        "PlayerName:"+obj["PlayerName"]+
                        ", Score:"+obj["Score"]+
                        ", Coin"+obj["Coin"]
                        );
                }
            }
        });
    }
}
